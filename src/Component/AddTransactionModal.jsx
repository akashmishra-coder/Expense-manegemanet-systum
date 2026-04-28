import React, { useEffect, useState } from "react";
import "./AddTransactionModal.css";
import { FaCloudUploadAlt } from "react-icons/fa";
import { useTransactions } from "../Context/TransactionContext";

const AddTransactionModal = ({
  isOpen,
  onClose,
  addTransaction,
  categories,
  editData,
}) => {

  const {vendors} = useTransactions(); // Pull vendors from context

  const [formData, setFormData] = useState({
    name: "",
    type: "income",
    amount: "",
    category: "",
    paymentMethod: "Cash",
    date: "",
    note: "",
    vendor: "", // This will now store the Vendor Name or ID
    status: "Paid",
  });

  const [files, setFiles] = useState([]);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (editData) {
      setFormData({
        name: editData.name || "",
        type: editData.type || "income",
        amount: editData.amount || "",
        category: editData.category || "",
        paymentMethod: editData.paymentMethod || "Cash",
        date: editData.date || "",
        note: editData.note || "",
        vendor: editData.vendor || "",
        status: editData.status || "Paid",
      });
      setFiles(Array.isArray(editData.files) ? editData.files : []);
    } else {
      setFormData({
        name: "",
        type: "income",
        amount: "",
        category: "",
        paymentMethod: "Cash",
        date: "",
        note: "",
        vendor: "",
        status: "Paid",
      });
      setFiles([]);
    }
  }, [editData, isOpen]);

  if (!isOpen) return null;

const handleChange = (e) => {
  const { name, value } = e.target;

  if (name === "type") {
    setFormData({ ...formData, type: value, category: "" });
  } 
  else if (name === "vendor") {
    const selectedVendor = vendors.find((v) => v.name === value);

    setFormData((prev) => ({
      ...prev,
      vendor: value,
      // Automatically sync Category AND Type from the Vendor settings
      category: selectedVendor ? selectedVendor.category : prev.category,
      type: selectedVendor ? selectedVendor.type : prev.type, 
    }));
  } 
  else {
    setFormData({ ...formData, [name]: value });
  }
};

  // ... (handleFileChange, handleRemoveFile, handleDrop logic remains same as your original)
  const handleFileChange = (e) => {
    const uploadedFiles = Array.from(e.target.files);
    const newFiles = uploadedFiles.map((file) => {
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          resolve({ name: file.name, type: file.type, data: reader.result });
        };
        reader.readAsDataURL(file);
      });
    });
    Promise.all(newFiles).then((result) =>
      setFiles((prev) => [...prev, ...result]),
    );
  };

  const handleRemoveFile = () => setFiles([]);

  const handleDrop = (e) => {
    e.preventDefault();
    const droppedFiles = Array.from(e.dataTransfer.files);
    const newFiles = droppedFiles.map((file) => {
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          resolve({ name: file.name, type: file.type, data: reader.result });
        };
        reader.readAsDataURL(file);
      });
    });
    Promise.all(newFiles).then((result) =>
      setFiles((prev) => [...prev, ...result]),
    );
  };

  const validate = () => {
    let newErrors = {};
    if (!formData.amount || formData.amount <= 0)
      newErrors.amount = "Amount is required";
    if (!formData.category) newErrors.category = "Please select a category";
    if (!formData.date) newErrors.date = "Date is required";
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    addTransaction({
      id: editData ? editData.id : Date.now(),
      ...formData,
      amount: Number(formData.amount),
      files,
    });

    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal modern">
        <h2>{editData ? "Edit Transaction" : "Add Transaction"}</h2>
        <p className="subtitle">Fill details and save transaction</p>

        <form onSubmit={handleSubmit}>
          {/* Row 1: Vendor Dropdown and Type */}
          <div className="form-row">
            <div className="form-group">
              <label>Select Vendor *</label>
              <select
                name="vendor"
                value={formData.vendor}
                onChange={handleChange}
                className={errors.vendor ? "error-border" : ""}
              >
                <option value="">-- Select Vendor --</option>
                {vendors &&
                  vendors.map((v) => (
                    <option key={v.id} value={v.name}>
                      {v.name}
                    </option>
                  ))}
              </select>
              {errors.vendor && <span className="error">{errors.vendor}</span>}
            </div>

            <div className="form-group">
              <label>Type *</label>
              <select name="type" value={formData.type} onChange={handleChange}>
                <option value="income">Income</option>
                <option value="expense">Expense</option>
              </select>
            </div>
          </div>

          {/* ... Rest of your form (Amount, Category, Status, etc.) stays the same ... */}
          <div className="form-row">
            <div className="form-group">
              <label>Amount *</label>
              <input
                type="number"
                name="amount"
                value={formData.amount}
                onChange={handleChange}
              />
              {errors.amount && <span className="error">{errors.amount}</span>}
            </div>

            <div className="form-group">
              <label>Category *</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
              >
                <option value="">Select Category *</option>
                {categories[formData.type].map((cat, i) => (
                  <option key={i}>{cat}</option>
                ))}
              </select>
              {errors.category && (
                <span className="error">{errors.category}</span>
              )}
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Status *</label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
              >
                <option value="Paid">Paid</option>
                <option value="Upcoming">Upcoming</option>
                <option value="Due">Due</option>
              </select>
            </div>

            {formData.status === "Paid" && (
              <div className="form-group">
                <label>Payment Method *</label>
                <select
                  name="paymentMethod"
                  value={formData.paymentMethod}
                  onChange={handleChange}
                >
                  <option>Cash</option>
                  <option>UPI</option>
                  <option>Bank</option>
                  <option>Card</option>
                </select>
              </div>
            )}

            <div className="form-group">
              <label>Date *</label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
              />
              {errors.date && <span className="error">{errors.date}</span>}
            </div>
          </div>

          {/* Upload and Note sections remain identical to your code */}
          <div className="form-group full">
            <label>Upload Invoice / Payment Proof *</label>
            <div
              className="upload-box modern-upload"
              onDragOver={(e) => e.preventDefault()}
              onDrop={handleDrop}
            >
              <FaCloudUploadAlt size={30} />
              <p>Drag & drop files here</p>
              <input type="file" multiple onChange={handleFileChange} />
            </div>
            {files.length > 0 && (
              <div className="preview-box">
                <div className="preview-wrapper multi">
                  {files.map((f, i) =>
                    f.type.startsWith("image/") ? (
                      <img key={i} src={f.data} alt="preview" />
                    ) : (
                      <p key={i}>{f.name}</p>
                    ),
                  )}
                  <button
                    type="button"
                    className="remove-file"
                    onClick={handleRemoveFile}
                  >
                    ×
                  </button>
                </div>
              </div>
            )}
          </div>

          <div className="form-group full">
            <label>Note *</label>
            <textarea
              name="note"
              value={formData.note}
              onChange={handleChange}
              placeholder="Write something..."
            />
          </div>

          <div className="modal-actions modern-actions">
            <button type="submit" className="save-btn hover active">
              Save
            </button>
            <button
              type="button"
              onClick={onClose}
              className="cancel-btn hover active"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTransactionModal;

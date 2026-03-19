import React, { useState } from "react";
import "./AddTransactionModal.css";

const AddTransactionModal = ({ isOpen, onClose, addTransaction }) => {
  const categories = {
    income: ["Rent", "Deposit", "Food Charges", "Laundry", "Other"],
    expense: [
      "Electricity",
      "Water",
      "Salary",
      "Food Supplies",
      "Maintenance",
      "Other",
    ],
  };

  const [formData, setFormData] = useState({
    type: "income",
    amount: "",
    category: "",
    paymentMethod: "Cash",
    date: "",
    note: "",
  });

  const [errors, setErrors] = useState({});

  if (!isOpen) return null;

  // Handle Input Change
const handleChange = (e) => {
  const { name, value } = e.target;

  if (name === "type") {
    setFormData({
      ...formData,
      type: value,
      category: "", // reset category
    });
  } else {
    setFormData({ ...formData, [name]: value });
  }
};

  // Validation
  const validate = () => {
    let newErrors = {};

    if (!formData.amount || formData.amount <= 0) {
      newErrors.amount = "Amount must be greater than 0";
    }

   if (!formData.category) {
  newErrors.category = "Please select a category";
}

    if (!formData.date) {
      newErrors.date = "Date is required";
    }

    return newErrors;
  };

  // Submit
  const handleSubmit = (e) => {
    e.preventDefault();

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const newTransaction = {
      id: Date.now(),
      ...formData,
      amount: Number(formData.amount),
    };

    addTransaction(newTransaction);

    // Reset form
    setFormData({
      type: "income",
      amount: "",
      category: "",
      paymentMethod: "Cash",
      date: "",
      note: "",
    });

    setErrors({});
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Add Transaction</h2>

        <form onSubmit={handleSubmit}>
          {/* Type */}
          <label>Type</label>
          <select name="type" value={formData.type} onChange={handleChange}>
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>

          {/* Amount */}
          <label>Amount</label>
          <input
            type="number"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
          />
          {errors.amount && <span className="error">{errors.amount}</span>}

          {/* Category */}
          <label>Category</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
          >
            <option value="">Select Category</option>

            {categories[formData.type].map((cat, index) => (
              <option key={index} value={cat}>
                {cat}
              </option>
            ))}
          </select>

          {errors.category && <span className="error">{errors.category}</span>}
          {/* Payment */}
          <label>Payment Method</label>
          <select
            name="paymentMethod"
            value={formData.paymentMethod}
            onChange={handleChange}
          >
            <option>Cash</option>
            <option>UPI</option>
            <option>Bank</option>
          </select>

          {/* Date */}
          <label>Date</label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
          />
          {errors.date && <span className="error">{errors.date}</span>}

          {/* Note */}
          <label>Note</label>
          <textarea name="note" value={formData.note} onChange={handleChange} />

          {/* Buttons */}
          <div className="modal-actions">
            <button type="submit" className="save-btn">
              Save
            </button>
            <button type="button" onClick={onClose} className="cancel-btn">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTransactionModal;

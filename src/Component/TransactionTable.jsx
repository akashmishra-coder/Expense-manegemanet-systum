import "./TransactionTable.css";
import React, { useState } from "react";
import {
  FaBolt,
  FaTint,
  FaUserTie,
  FaUtensils,
  FaTools,
  FaMoneyBillWave,
  FaHome,
  FaTags,
} from "react-icons/fa";

const categoryIcons = {
  Electricity: FaBolt,
  Water: FaTint,
  Salary: FaUserTie,
  "Food Supplies": FaUtensils,
  Maintenance: FaTools,
  Rent: FaHome,
  Deposit: FaMoneyBillWave,
  "Food Charges": FaUtensils,
  Laundry: FaTags,
  Other: FaTags,
};

const TransactionTable = ({
  transactions,
  setTransactions,
  fromDate,
  toDate,
  typeFilter,
  setFromDate,
  setToDate,
  setTypeFilter,
  setEditData,
  setIsModalOpen,
}) => {
  const [deleteId, setDeleteId] = useState(null);
  const [previewFile, setPreviewFile] = useState(null);
  // const handleDelete = (id) => {
  //   const confirmDelete = window.confirm(
  //     "Are you sure you want to delete this transaction?",
  //   );

  //   if (!confirmDelete) return;

  //   const updated = transactions.filter((item) => item.id !== id);
  //   setTransactions(updated);
  // };

  const handleDelete = (id) => {
    // const confirmDelete = window.confirm(
    //   "Are you sure you want to delete this transaction?",
    // );

    // if (!confirmDelete) return;

    const updated = transactions.filter((item) => item.id !== id);
    setTransactions(updated);
  };

  const handleReset = () => {
    setFromDate("");
    setToDate("");
    setTypeFilter("all");
  };

  return (
    <div className="table-container">
      <div className="table-header">
        <h2>Transactions History</h2>

        <div className="filter-box">
          <input
            type="date"
            value={fromDate}
            onChange={(e) => setFromDate(e.target.value)}
          />

          <input
            type="date"
            value={toDate}
            onChange={(e) => setToDate(e.target.value)}
          />

          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
          >
            <option value="all">All</option>
            <option value="income">Income</option>
            <option value="expense">Expense</option>
            <option value="upcoming">Upcoming</option>
            <option value="due">Due</option>
          </select>

          <button onClick={handleReset} className="reset-btn">
            Reset
          </button>
        </div>
      </div>

      <table>
        <thead>
          <tr>
            <th>Category</th>
            <th>Vendor Name</th>
            <th>Date</th>
            <th>Type</th>
            <th>Amount</th>
            <th>Payment</th>
            <th>Note</th>
            <th>Attachment</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {transactions.length === 0 ? (
            <tr>
              <td colSpan="7" className="no-data">
                No transactions found
              </td>
            </tr>
          ) : (
            transactions.map((item) => (
              <tr key={item.id}>
                <td data-label="Category">
                  <div className="category-cell">
                    <div className="icon-circle">
                      {categoryIcons[item.category] ? (
                        React.createElement(categoryIcons[item.category])
                      ) : (
                        <FaTags />
                      )}
                    </div>
                    <span>{item.category}</span>
                  </div>
                </td>
                <td data-label="Vendor Name">{item.vendor}</td>
                <td data-label="Date">{item.date}</td>
                <td data-label="Type">{item.type}</td>
                <td data-label="Amount">₹{item.amount}</td>
                <td data-label="Payment">{item.paymentMethod}</td>
                <td data-label="Note">{item.note}</td>
                <td data-label="Attachment">
                  {item.files?.length > 0 ? (
                    <div className="multi-files">
                      {item.files.map((f, i) => {
                        const isImage =
                          f.type?.startsWith("image/") ||
                          f.data?.startsWith("data:image");

                        const isPDF =
                          f.type?.includes("pdf") ||
                          f.data?.startsWith("data:application/pdf");

                        if (isImage) {
                          return (
                            <img
                              key={i}
                              src={f.data}
                              className="table-img"
                              onClick={() => setPreviewFile(f)}
                            />
                          );
                        }

                        if (isPDF) {
                          return (
                            <button key={i} onClick={() => setPreviewFile(f)}>
                              📄 View PDF
                            </button>
                          );
                        }

                        return (
                          <button key={i} onClick={() => setPreviewFile(f)}>
                            📁 File {i + 1}
                          </button>
                        );
                      })}
                    </div>
                  ) : (
                    "—"
                  )}
                </td>
                <td data-label="Action">
                  <button
                    className="edit-btn"
                    onClick={() => {
                      setEditData(item);
                      setIsModalOpen(true);
                    }}
                  >
                    Edit
                  </button>

                  <button
                    className="delete-btn"
                    onClick={() => setDeleteId(item.id)}
                  >
                    Delete
                  </button>

                  {/* Confirmation before Delete */}
                  {deleteId && (
                    <div className="modal-overlay">
                      <div className="modal small">
                        <h3>Delete Transaction</h3>
                        <p>Are you sure you want to delete this?</p>

                        <div className="modal-actions">
                          <button
                            className="delete-btn"
                            onClick={() => {
                              setTransactions((prev) => prev.filter(item => item.id !== deleteId));
                              setDeleteId(null);
                            }}
                          >
                            Yes, Delete
                          </button>

                          <button
                            className="cancel-btn"
                            onClick={() => setDeleteId(null)}
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {previewFile && (
        <div className="preview-overlay" onClick={() => setPreviewFile(null)}>
          <div className="preview-modal" onClick={(e) => e.stopPropagation()}>
            <span className="close-btn" onClick={() => setPreviewFile(null)}>
              ×
            </span>

            {(() => {
              const isImage =
                previewFile.type?.startsWith("image/") ||
                previewFile.data?.startsWith("data:image");

              const isPDF =
                previewFile.type?.includes("pdf") ||
                previewFile.data?.startsWith("data:application/pdf");

              if (isImage) {
                return <img src={previewFile.data} alt="preview" />;
              }

              if (isPDF) {
                return (
                  <iframe src={previewFile.data} title="pdf-preview" className="pdf-viewer"></iframe>
                );
              }

              return <p>Cannot preview this file</p>;
            })()}
          </div>
        </div>
      )}
    </div>
  );
};

export default TransactionTable;

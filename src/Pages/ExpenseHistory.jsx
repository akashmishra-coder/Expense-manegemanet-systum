import React, { useState, useMemo } from "react";
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
import { RiDeleteBin6Line, RiResetLeftLine } from "react-icons/ri";
import { CiEdit } from "react-icons/ci";
import { FiArrowLeft, FiFilter } from "react-icons/fi";
import { useTransactions } from "../Context/TransactionContext"; // Import your custom hook
import { Link } from "react-router-dom";

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

const ExpenseHistory = () => {
  const {
    filteredTransactions,
    deleteTransaction,
    setEditData,
    setIsModalOpen,
    fromDate,
    setFromDate,
    toDate,
    setToDate,
    setTypeFilter,
    resetFilters,
  } = useTransactions();

  const [deleteId, setDeleteId] = useState(null);
  const [previewFile, setPreviewFile] = useState(null);
  const [filter, setfilter] = useState(true);

  // 1. Add Search State
  const [searchTerm, setSearchTerm] = useState("");

  const handleDelete = (id) => {
    deleteTransaction(id);
    setDeleteId(null);
  };

  const handleReset = () => {
    resetFilters();
    setSearchTerm(""); // 2. Clear search on reset
  };

  // 3. Search Filtering Logic
  const searchedTransactions = useMemo(() => {
    if (!searchTerm.trim()) return filteredTransactions;

    const lower = searchTerm.toLowerCase();

    return filteredTransactions.filter((item) => {
      return (
        item.category?.toLowerCase().includes(lower) ||
        item.vendor?.toLowerCase().includes(lower) ||
        item.note?.toLowerCase().includes(lower) ||
        item.status?.toLowerCase().includes(lower) ||
        item.amount?.toString().includes(lower) ||
        item.paymentMethod?.toLowerCase().includes(lower)
      );
    });
  }, [filteredTransactions, searchTerm]);

  return (
    <div className="bg-gray-50 min-h-screen ">
      <div className="bg-white h-full rounded-2xl shadow px-10 py-8">
        {/* Header */}
        <h2 className="text-4xl font-bold text-gray-800 text-center mb-6">
          Transactions History
        </h2>

        <div className="flex justify-start items-center shadow gap-4 mb-4 bg-white p-4 rounded-xl border border-gray-200">
          <button className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition border shadow-sm rounded-lg px-4 py-2 bg-white">
            <Link to="/" className="flex items-center gap-2">
              {" "}
              <FiArrowLeft /> Back to Directory{" "}
            </Link>
          </button>

          <button
            onClick={() => setIsModalOpen(true)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 active:scale-95 transition cursor-pointer "
          >
            Add New Expense
          </button>
        </div>

        {/* Filters */}
        <div className="flex flex-col gap-4 p-3 border shadow pb-4 border-gray-200 rounded-xl">
          <div className="flex gap-4 flex-wrap ">
            <button
              onClick={() => setfilter((prev) => !prev)}
              className="px-4 py-2 flex items-center gap-2 cursor-pointer border border-gray-300 text-black rounded-lg hover:bg-gray-100 active:scale-95 transition"
            >
              <FiFilter /> Filter
            </button>

            <button
              onClick={handleReset}
              className="px-4 py-2  flex items-center gap-2 border border-gray-300 text-black rounded-lg hover:bg-gray-100 active:scale-95 transition"
            >
              <RiResetLeftLine />
              Refresh
            </button>

            {/* 4. Bind the Search Input */}
            <input
              type="text"
              placeholder="Search by category, vendor, amount..."
              className="px-3 py-2 border rounded-lg w-64 ml-5"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {filter && (
            <div className="flex flex-wrap gap-3 items-center bg-gray-50 p-4 rounded-xl">
              <input
                type="date"
                value={fromDate}
                onChange={(e) => setFromDate(e.target.value)}
                className="px-3 py-2 border rounded-lg"
              />

              <input
                type="date"
                value={toDate}
                onChange={(e) => setToDate(e.target.value)}
                className="px-3 py-2 border rounded-lg"
              />

              <button
                onClick={() => setTypeFilter("income")}
                className="px-3 py-1 bg-green-200 text-green-700 rounded-full cursor-pointer hover:bg-green-300"
              >
                Income
              </button>

              <button
                onClick={() => setTypeFilter("expense")}
                className="px-3 py-1 bg-red-200 text-red-700 rounded-full cursor-pointer hover:bg-red-300"
              >
                Expense
              </button>

              <button
                onClick={() => setTypeFilter("upcoming")}
                className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full cursor-pointer hover:bg-blue-300"
              >
                Upcoming
              </button>

              <button
                onClick={() => setTypeFilter("due")}
                className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full cursor-pointer hover:bg-yellow-300"
              >
                Due
              </button>
            </div>
          )}
        </div>

        {/* Table */}
        <div className="overflow-auto rounded-xl border border-gray-300 p-2 mt-6">
          <table className="w-full text-sm text-left">
            <thead className="bg-gray-100 text-gray-700 uppercase text-xs">
              <tr>
                <th className="p-3">Category</th>
                <th className="p-3">Vendor</th>
                <th className="p-3">Date</th>
                <th className="p-3">Type</th>
                <th className="p-3">Status</th>
                <th className="p-3">Amount</th>
                <th className="p-3">Payment</th>
                <th className="p-3">Note</th>
                <th className="p-3">Attachment</th>
                <th className="p-3">Action</th>
              </tr>
            </thead>

            <tbody className="divide-y  overflow-auto">
              {/* 5. Map over searchedTransactions instead of filteredTransactions */}
              {searchedTransactions.length === 0 ? (
                <tr>
                  <td colSpan="10" className="text-center py-6 text-gray-500">
                    No transactions found
                  </td>
                </tr>
              ) : (
                searchedTransactions.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50 transition">
                    <td className="p-3 flex items-center gap-2">
                      <div className="w-8 h-8 flex items-center justify-center bg-blue-500 text-white rounded-full">
                        {categoryIcons[item.category] ? (
                          React.createElement(categoryIcons[item.category])
                        ) : (
                          <FaTags />
                        )}
                      </div>
                      {item.category}
                    </td>

                    <td className="p-3">{item.vendor}</td>
                    <td className="p-3">{item.date}</td>

                    <td className="p-3">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          item.type === "income"
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {item.type}
                      </span>
                    </td>

                    <td className="p-3">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          item.status === "Paid"
                            ? "bg-green-100 text-green-700"
                            : item.status === "Due"
                              ? "bg-yellow-100 text-yellow-700"
                              : "bg-blue-100 text-blue-700"
                        }`}
                      >
                        {item.status}
                      </span>
                    </td>
                    <td className="p-3 font-semibold">₹{item.amount}</td>

                    <td className="p-3">{item.paymentMethod}</td>
                    <td className="p-3 truncate max-w-30" title={item.note}>
                      {item.note}
                    </td>

                    <td className="p-3">
                      {item.files?.length > 0 ? (
                        <div className="flex gap-2 flex-wrap">
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
                                  className="w-8 h-8 object-cover rounded cursor-pointer border border-gray-300"
                                  onClick={() => setPreviewFile(f)}
                                  alt="attachment preview"
                                />
                              );
                            }

                            if (isPDF) {
                              return (
                                <button
                                  key={i}
                                  onClick={() => setPreviewFile(f)}
                                  className="px-2 py-1 bg-gray-200 rounded cursor-pointer text-blue-600 hover:bg-gray-300 text-xs"
                                >
                                  PDF
                                </button>
                              );
                            }

                            return (
                              <button
                                key={i}
                                onClick={() => setPreviewFile(f)}
                                className="text-xs text-blue-500"
                              >
                                📁 File {i + 1}
                              </button>
                            );
                          })}
                        </div>
                      ) : (
                        "—"
                      )}
                    </td>

                    <td className="p-3 flex gap-3">
                      <button
                        onClick={() => {
                          setEditData(item);
                          setIsModalOpen(true);
                        }}
                        className="text-blue-600 hover:scale-110 transition cursor-pointer"
                      >
                        <CiEdit size={18} />
                      </button>

                      <button
                        onClick={() => setDeleteId(item.id)}
                        className="text-red-600 hover:scale-110 transition cursor-pointer"
                      >
                        <RiDeleteBin6Line size={18} />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Delete Modal */}
        {deleteId && (
          <div
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
            onClick={(e) => {
              e.stopPropagation();
              setDeleteId(null);
            }}
          >
            <div className="bg-white p-6 rounded-xl shadow-lg z-50">
              <h3 className="text-lg font-semibold mb-2">Delete Transaction</h3>
              <p className="text-sm text-gray-600 mb-4">
                Are you sure you want to delete this?
              </p>

              <div className="flex gap-6 justify-between">
                <button
                  onClick={() => handleDelete(deleteId)}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg cursor-pointer hover:bg-red-700 active:scale-95 transition"
                >
                  Delete
                </button>

                <button
                  onClick={() => setDeleteId(null)}
                  className="px-4 py-2 bg-gray-400 text-white rounded-lg cursor-pointer hover:bg-gray-500 active:scale-95 transition"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Preview Modal */}
        {previewFile && (
          <div
            className="fixed inset-0 bg-black/70 flex items-center justify-center z-50"
            onClick={() => setPreviewFile(null)}
          >
            <div
              className="bg-white w-[90%] h-[90%] rounded-xl overflow-hidden flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-end p-4 border-b">
                <button
                  onClick={() => setPreviewFile(null)}
                  className="text-gray-500 hover:text-black font-bold text-xl"
                >
                  ✕
                </button>
              </div>

              <div className="flex-1 overflow-auto p-4 flex items-center justify-center bg-gray-100">
                {previewFile.type?.startsWith("image/") ? (
                  <img
                    src={previewFile.data}
                    className="max-w-full max-h-full object-contain"
                    alt="Preview"
                  />
                ) : (
                  <iframe
                    title="Document Preview"
                    src={previewFile.data}
                    className="w-full h-full"
                  />
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ExpenseHistory;

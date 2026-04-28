import React, { useState } from "react";
import { useTransactions } from "../Context/TransactionContext"; // Adjust path as needed
import { FiArrowLeft, FiPlus, FiTrash2 } from "react-icons/fi";
import { FaMoneyBillWave, FaShoppingCart } from "react-icons/fa";
import { Link } from "react-router-dom";

const CategoryPage = () => {
  // 1. Pull the global categories state from Context
  const { categories, setCategories } = useTransactions();

  // 2. Local state for the "Add Category" form
  const [newCategoryName, setNewCategoryName] = useState("");
  const [categoryType, setCategoryType] = useState("expense");
  const [error, setError] = useState("");

  // 3. Logic to Add a Category
  const handleAddCategory = (e) => {
    e.preventDefault();
    const trimmedName = newCategoryName.trim();

    if (!trimmedName) {
      setError("Category name cannot be empty.");
      return;
    }

    // Prevent duplicates (case-insensitive check)
    const isDuplicate = categories[categoryType].some(
      (cat) => cat.toLowerCase() === trimmedName.toLowerCase(),
    );

    if (isDuplicate) {
      setError(`${trimmedName} already exists in ${categoryType}s!`);
      return;
    }

    // Update global context
    setCategories((prev) => ({
      ...prev,
      [categoryType]: [...prev[categoryType], trimmedName],
    }));

    // Reset form
    setNewCategoryName("");
    setError("");
  };

  // 4. Logic to Delete a Category
  const handleDeleteCategory = (type, categoryToRemove) => {
    setCategories((prev) => ({
      ...prev,
      [type]: prev[type].filter((cat) => cat !== categoryToRemove),
    }));
  };

  return (
    <div className="bg-gray-50 min-h-screen py-10 px-6">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header Section */}
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-800">
            Category Management
          </h1>
          <p className="text-gray-500 mt-2">
            View, add, and manage your income and expense categories.
          </p>
        </div>

        <button className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition border shadow-sm rounded-lg px-4 py-2 bg-white">
          <Link to="/" className="flex items-center gap-2">
            {" "}
            <FiArrowLeft /> Back to Directory{" "}
          </Link>
        </button>

        {/* Add New Category Form */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <h2 className="text-xl font-semibold text-gray-700 mb-4 flex items-center gap-2">
            <FiPlus className="text-blue-500" /> Add Custom Category
          </h2>

          <form
            onSubmit={handleAddCategory}
            className="flex flex-col sm:flex-row gap-4 items-start sm:items-center"
          >
            <select
              value={categoryType}
              onChange={(e) => {
                setCategoryType(e.target.value);
                setError(""); // clear error when switching types
              }}
              className="px-4 py-2.5 border border-gray-300 rounded-xl bg-gray-50 text-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500 w-full sm:w-auto min-w-37.5"
            >
              <option value="income">Income</option>
              <option value="expense">Expense</option>
            </select>

            <div className="flex-1 w-full">
              <input
                type="text"
                placeholder="e.g., Freelance, Gym, Subscriptions..."
                value={newCategoryName}
                onChange={(e) => {
                  setNewCategoryName(e.target.value);
                  if (error) setError(""); // clear error as user types
                }}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-1 focus:ring-blue-300"
              />
              {error && (
                <p className="text-red-500 text-sm mt-1 absolute ">{error}</p>
              )}
            </div>

            <button
              type="submit"
              className="px-6 py-2.5 bg-blue-600 text-white font-medium rounded-xl hover:bg-blue-700 active:scale-95 transition w-full sm:w-auto whitespace-nowrap cursor-pointer"
            >
              Save Category
            </button>
          </form>
        </div>

        {/* Categories Display Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
          {/* Income Column */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <div className="flex items-center gap-3 mb-6 border-b pb-4">
              <div className="p-3 bg-green-100 text-green-600 rounded-xl">
                <FaMoneyBillWave size={24} />
              </div>
              <h2 className="text-2xl font-bold text-gray-800">
                Income Categories
              </h2>
            </div>

            <div className="flex flex-wrap gap-3">
              {categories.income.length === 0 ? (
                <p className="text-gray-400 italic">
                  No income categories found.
                </p>
              ) : (
                categories.income.map((cat, idx) => (
                  <div
                    key={idx}
                    className="group flex items-center gap-2 bg-green-50 text-green-800 px-4 py-2 rounded-lg border border-green-200 transition hover:shadow-md"
                  >
                    <span className="font-medium">{cat}</span>
                    <button
                      onClick={() => handleDeleteCategory("income", cat)}
                      className="text-green-600/50 hover:text-red-500 transition opacity-0 group-hover:opacity-100 cursor-pointer"
                      title="Delete category"
                    >
                      <FiTrash2 size={16} />
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Expense Column */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <div className="flex items-center gap-3 mb-6 border-b pb-4">
              <div className="p-3 bg-red-100 text-red-600 rounded-xl">
                <FaShoppingCart size={24} />
              </div>
              <h2 className="text-2xl font-bold text-gray-800">
                Expense Categories
              </h2>
            </div>

            <div className="flex flex-wrap gap-3">
              {categories.expense.length === 0 ? (
                <p className="text-gray-400 italic">
                  No expense categories found.
                </p>
              ) : (
                categories.expense.map((cat, idx) => (
                  <div
                    key={idx}
                    className="group flex items-center gap-2 bg-red-50 text-red-800 px-4 py-2 rounded-lg border border-red-200 transition hover:shadow-md"
                  >
                    <span className="font-medium">{cat}</span>
                    <button
                      onClick={() => handleDeleteCategory("expense", cat)}
                      className="text-red-600/50 hover:text-red-500 transition opacity-0 group-hover:opacity-100 cursor-pointer"
                      title="Delete category"
                    >
                      <FiTrash2 size={16} />
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;

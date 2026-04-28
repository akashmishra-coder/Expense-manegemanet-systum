import React, { useState } from "react";
import KpiCards from "../Component/KpiCards";
import "./home.css";
import Dashboard from "../Component/Deshboard";
import { useTransactions } from "../Context/TransactionContext";
import { Link } from "react-router-dom";

function Home() {
  // 1. Pull everything we need from our global Context
  const {
    transactions,
    setTransactions,
    filteredTransactions,
    categories,
    setCategories,
    setIsModalOpen,
    setEditData,
    fromDate,
    setFromDate,
    toDate,
    setToDate,
    typeFilter,
    setTypeFilter,
  } = useTransactions();

  // 2. Local state specifically for the "Add Category" mini-modal
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [newCategory, setNewCategory] = useState("");
  const [categoryType, setCategoryType] = useState("expense");

  // Add new Category globally to the context
  const addCategory = () => {
    if (!newCategory.trim()) return;

    setCategories((prev) => ({
      ...prev,
      [categoryType]: [...prev[categoryType], newCategory],
    }));

    setNewCategory("");
    setIsCategoryOpen(false);
  };

  // 3. Calculate KPIs automatically based on the Context's filtered data
  const totalIncome = filteredTransactions
    .filter((t) => t.type === "income")
    .reduce((acc, curr) => acc + Number(curr.amount), 0);

  const totalExpense = filteredTransactions
    .filter((t) => t.type === "expense")
    .reduce((acc, curr) => acc + Number(curr.amount), 0);

  const netProfit = totalIncome - totalExpense;

  const KpiData = [
    { name: "Total Income", value: totalIncome },
    { name: "Total Expense", value: totalExpense },
    { name: "Net Profit", value: netProfit },
    { name: "Balance", value: netProfit },
  ];

  return (
    <div className="app-container">
      <h1 className="title-first">Dashboard</h1>
      <h3 className="title-second">Expense Management System</h3>

      {/* KPI GRID */}
      <div className="kpi-grid">
        {KpiData.map((item, idx) => (
          <KpiCards key={idx} item={item} />
        ))}
      </div>

      <div className="action-bar">
        {/* Just trigger the context's modal state! */}
        <Link to="/expense-history" className="addCategoryBtn">
          Your Transactions
        </Link>

        {/* <button
          className="addCategoryBtn"
          onClick={() => setIsCategoryOpen(true)}
        >
          + Add Category
        </button> */}
        <Link to="/categories" className="addCategoryBtn">
          View Categories
        </Link>
        <Link to="/vendors" className="addCategoryBtn">
          View Vendors
        </Link>

        {/* Local Add Category Modal */}
        {isCategoryOpen && (
          <div className="modal-overlay">
            <div className="modal small">
              <h3>Add New Category</h3>

              <div className="form-group">
                <label>Type</label>
                <select
                  value={categoryType}
                  onChange={(e) => setCategoryType(e.target.value)}
                >
                  <option value="income">Income</option>
                  <option value="expense">Expense</option>
                </select>
              </div>

              <div className="form-group">
                <label>Category Name</label>
                <input
                  type="text"
                  placeholder="Enter category"
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                />
              </div>

              <div className="modal-actions">
                <button className="save-btn hover active" onClick={addCategory}>
                  Add
                </button>

                <button
                  className="cancel-btn hover active"
                  onClick={() => setIsCategoryOpen(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Note: The Dashboard still receives these as props so you don't have to 
        rewrite the Dashboard component immediately. 
        (Eventually, Dashboard can also just use useTransactions() directly!) 
      */}
      <Dashboard
        transactions={transactions}
        setTransactions={setTransactions}
        filteredTransactions={filteredTransactions}
        fromDate={fromDate}
        toDate={toDate}
        typeFilter={typeFilter}
        setFromDate={setFromDate}
        setToDate={setToDate}
        setTypeFilter={setTypeFilter}
        setEditData={setEditData}
        setIsModalOpen={setIsModalOpen}
      />
    </div>
  );
}

export default Home;
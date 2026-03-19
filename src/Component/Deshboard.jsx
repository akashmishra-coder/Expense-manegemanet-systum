import React, { useState, useEffect } from "react";
import TransactionTable from "./TransactionTable";
import AddTransactionModal from "./AddTransactionModal";
import ExpenseChart from "./ExpenseCharts";

const Dashboard = ({
  transactions,
  setTransactions,
  filteredTransactions,
  fromDate,
  toDate,
  typeFilter,
  setFromDate,
  setToDate,
  setTypeFilter,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem("transactions", JSON.stringify(transactions));
  }, [transactions]);

  const addTransaction = (data) => {
    setTransactions((prev) => [...prev, data]);
  };

  return (
    <div style={{ width: "100%" }}>
      <h2 style={{ textAlign: "center", fontSize: "30px", color:"white" }}>
        Dashboard
      </h2>

      {/* 🔥 CHART USES FILTERED DATA */}
      <ExpenseChart transactions={filteredTransactions} />

      <button
        style={{
          padding: "10px",
          borderRadius: "10px",
          background: "white",
          border: "1px solid",
          marginTop: "20px",
        }}
        onClick={() => setIsModalOpen(true)}
      >
        + Add Transaction
      </button>

      <AddTransactionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        addTransaction={addTransaction}
      />

      <TransactionTable
        transactions={filteredTransactions}
        setTransactions={setTransactions}
        fromDate={fromDate}
        toDate={toDate}
        typeFilter={typeFilter}
        setFromDate={setFromDate}
        setToDate={setToDate}
        setTypeFilter={setTypeFilter}
      />
    </div>
  );
};

export default Dashboard;
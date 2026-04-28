import React, { useEffect } from "react";
import TransactionTable from "./TransactionTable";
import ExpenseChart from "./ExpenseCharts";
import WeaklyExpenseAndPaymentHistory from "./PaymentHistory";
import BalanceTrends from "./BalanceTrends";

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
  setEditData,
  setIsModalOpen
}) => {
  return (
    <div style={{ width: "100%" }}>
      {/* 🔥 CHART USES FILTERED DATA */}
      <ExpenseChart transactions={filteredTransactions} />

      <BalanceTrends />

      {/* <TransactionTable
        transactions={filteredTransactions}
        setTransactions={setTransactions}
        fromDate={fromDate}
        toDate={toDate}
        typeFilter={typeFilter}
        setFromDate={setFromDate}
        setToDate={setToDate}
        setTypeFilter={setTypeFilter}
        setEditData={setEditData}
        setIsModalOpen={setIsModalOpen}
      /> */}
    </div>
  );
};

export default Dashboard;

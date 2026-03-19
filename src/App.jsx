import { useEffect, useState } from "react";
import Dashboard from "./Component/Deshboard";
import KpiCards from "./Component/KpiCards";
import bg from "./assets/bg.jpg";

function App() {
  // ✅ Load from localStorage (ONLY ONCE)
  const [transactions, setTransactions] = useState(() => {
    try {
      const stored = localStorage.getItem("transactions");
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  // 🔥 GLOBAL FILTER STATE
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");

  // 🔥 FILTERED DATA (Single source)
  const filteredTransactions = transactions.filter((item) => {
    const itemDate = new Date(item.date);

    const matchesDate =
      (!fromDate || itemDate >= new Date(fromDate)) &&
      (!toDate || itemDate <= new Date(toDate));

    const matchesType = typeFilter === "all" || item.type === typeFilter;

    return matchesDate && matchesType;
  });

  // 🔥 KPI CALCULATION (USE FILTERED DATA)
  const totalIncome = filteredTransactions
    .filter((t) => t.type === "income")
    .reduce((acc, curr) => acc + Number(curr.amount), 0);

  const totalExpense = filteredTransactions
    .filter((t) => t.type === "expense")
    .reduce((acc, curr) => acc + Number(curr.amount), 0);

  const netProfit = totalIncome - totalExpense;
  const balance = netProfit;

  const KpiData = [
    { name: "Total Income", value: totalIncome, bgColor: "green" },
    { name: "Total Expense", value: totalExpense, bgColor: "red" },
    { name: "Net Profit", value: netProfit, bgColor: "blue" },
    { name: "Balance", value: balance, bgColor: "purple" },
  ];

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        // background:"#f0f0f0",
        backgroundImage: `url(${bg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        minHeight: "100vh",
        maxWidth: "100vw",
        margin: "auto",
        padding: "20px 100px",
        paddingBottom: "50px",
        
      }}
    >
      <h1 style={{color:"white" , paddingBottom:"20px"}}>Expense Management System</h1>

      {/* KPI */}
      <div style={{ display: "flex", gap: "100px", flexWrap: "wrap" }}>
        {KpiData.map((item, idx) => (
          <KpiCards key={idx} item={item} />
        ))}
      </div>

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
      />
    </div>
  );
}

export default App;

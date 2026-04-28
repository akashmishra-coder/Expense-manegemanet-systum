import React, { useState } from "react";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import "./ExpenseChart.css";

const ExpenseChart = ({ transactions }) => {
  // 🔹 STATE FOR CHART TOGGLE
  const [chartType, setChartType] = useState("bar");

  // 🔹 GROUP DATA BY MONTH
  const monthlyMap = {};

  transactions.forEach((item) => {
    const month = new Date(item.date).toLocaleString("default", {
      month: "short",
    });

    if (!monthlyMap[month]) {
      monthlyMap[month] = { month, income: 0, expense: 0 };
    }

    if (item.type === "income") {
      monthlyMap[month].income += Number(item.amount);
    } else {
      monthlyMap[month].expense += Number(item.amount);
    }
  });

  const monthlyData = Object.values(monthlyMap).sort(
    (a, b) => new Date(`1 ${a.month} 2026`) - new Date(`1 ${b.month} 2026`)
  );

  // 🔹 EXPENSE CATEGORY BREAKDOWN
  const expenseMap = {};

  transactions.forEach((item) => {
    if (item.type === "expense") {
      if (!expenseMap[item.category]) {
        expenseMap[item.category] = 0;
      }
      expenseMap[item.category] += Number(item.amount);
    }
  });

  const expenseData = Object.keys(expenseMap).map((key) => ({
    name: key,
    value: expenseMap[key],
  }));

  const totalExpense = expenseData.reduce((acc, item) => acc + item.value, 0);

  const breakdownData = expenseData.map((item) => ({
    ...item,
    percent: totalExpense ? ((item.value / totalExpense) * 100).toFixed(0) : 0,
  }));

  const COLORS = ["#4CAF50", "#FF5733", "#2196F3", "#FFC107", "#9C27B0"];

  if (transactions.length === 0) {
    return <p className="text-center text-gray-500 mt-10">No data to display</p>;
  }

  return (
    <div className="chart-container">
      {/* 🔹 Monthly Income vs Expense Chart */}
      <div className="chart-box">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-bold text-gray-700 m-0">Income vs Expense</h3>
          
          {/* Chart Toggle Buttons */}
          <div className="flex bg-gray-100 rounded-lg p-1 border border-gray-200">
            <button
              onClick={() => setChartType("bar")}
              className={`px-3 py-1 text-sm rounded-md transition ${
                chartType === "bar"
                  ? "bg-white shadow text-blue-600 font-medium"
                  : "text-gray-500 hover:text-gray-700 cursor-pointer"
              }`}
            >
              Bar
            </button>
            <button
              onClick={() => setChartType("line")}
              className={`px-3 py-1 text-sm rounded-md transition ${
                chartType === "line"
                  ? "bg-white shadow text-blue-600 font-medium"
                  : "text-gray-500 hover:text-gray-700 cursor-pointer"
              }`}
            >
              Line
            </button>
          </div>
        </div>

        <ResponsiveContainer width="100%" height={300}>
          {chartType === "bar" ? (
            <BarChart data={monthlyData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
              <XAxis dataKey="month" axisLine={false} tickLine={false} />
              <YAxis axisLine={false} tickLine={false} />
              <Tooltip cursor={{ fill: 'transparent' }} />
              <Legend iconType="circle" />
              <Bar dataKey="income" fill="green" radius={[4, 4, 0, 0]} name="Income" />
              <Bar dataKey="expense" fill="red" radius={[4, 4, 0, 0]} name="Expense" />
            </BarChart>
          ) : (
            <LineChart data={monthlyData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
              <XAxis dataKey="month" axisLine={false} tickLine={false} />
              <YAxis axisLine={false} tickLine={false} />
              <Tooltip />
              <Legend iconType="circle" />
              <Line 
                type="monotone" 
                dataKey="income" 
                stroke="green" 
                strokeWidth={3} 
                dot={{ r: 4 }} 
                activeDot={{ r: 6 }} 
                name="Income" 
              />
              <Line 
                type="monotone" 
                dataKey="expense" 
                stroke="red" 
                strokeWidth={3} 
                dot={{ r: 4 }} 
                activeDot={{ r: 6 }} 
                name="Expense" 
              />
            </LineChart>
          )}
        </ResponsiveContainer>
      </div>

      {/* 🔹 Monthly Expenses Breakdown */}
      <div className="chart-box">
        <h3 className="font-bold text-gray-700 mb-4">Monthly Expenses Breakdown</h3>

        {/* Segmented Progress Bar */}
        <div className="progress-bar flex h-3 rounded-full overflow-hidden mb-4">
          {breakdownData.map((item, index) => (
            <div
              key={index}
              style={{
                width: `${item.percent}%`,
                backgroundColor: COLORS[index % COLORS.length],
              }}
              title={`${item.name}: ${item.percent}%`}
            />
          ))}
        </div>

        {/* Category List */}
        <div className="expense-list space-y-3">
          {breakdownData.map((item, index) => (
            <div className="expense-item flex justify-between items-center text-sm" key={index}>
              <div className="left flex items-center gap-2">
                <span
                  className="dot w-3 h-3 rounded-full"
                  style={{ backgroundColor: COLORS[index % COLORS.length] }}
                />
                <span className="text-gray-600 font-medium">{item.name}</span>
              </div>

              <div className="right flex gap-4 text-gray-800 font-semibold">
                <span>₹{item.value}</span>
                <span className="percent text-gray-500 w-10 text-right">{item.percent}%</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ExpenseChart;
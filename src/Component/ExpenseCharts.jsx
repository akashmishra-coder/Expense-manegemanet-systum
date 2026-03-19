import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import "./ExpenseChart.css";

const ExpenseChart = ({ transactions }) => {
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
      monthlyMap[month].income += item.amount;
    } else {
      monthlyMap[month].expense += item.amount;
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
      expenseMap[item.category] += item.amount;
    }
  });

  const expenseData = Object.keys(expenseMap).map((key) => ({
    name: key,
    value: expenseMap[key],
  }));

  const COLORS = ["#4CAF50", "#FF5733", "#2196F3", "#FFC107", "#9C27B0"];

  if (transactions.length === 0) {
  return <p>No data to display</p>;
}

  return (
    <div className="chart-container">
      {/* Bar Chart */}
      <div className="chart-box">
        <h3>Income vs Expense</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={monthlyData}>
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="income" fill="#4CAF50" />
            <Bar dataKey="expense" fill="#FF5733" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Pie Chart */}
      <div className="chart-box">
        <h3>Expense Breakdown</h3>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={expenseData}
              dataKey="value"
              nameKey="name"
              outerRadius={100}
              label
            >
              {expenseData.map((entry, index) => (
                <Cell key={index} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ExpenseChart;
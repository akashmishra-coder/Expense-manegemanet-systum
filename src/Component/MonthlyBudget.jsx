import "./MonthlyBudget.css";
import { FaCar, FaTshirt, FaDog, FaGraduationCap, FaShoppingBasket } from "react-icons/fa";

const budgetData = [
  {
    name: "Grocery Stores",
    value: 75,
    icon: <FaShoppingBasket />,
    color: "#22c55e",
  },
  {
    name: "Transportation",
    value: 25,
    icon: <FaCar />,
    color: "#06b6d4",
  },
  {
    name: "Pets",
    value: 50,
    icon: <FaDog />,
    color: "#0ea5e9",
  },
  {
    name: "Education",
    value: 45,
    icon: <FaGraduationCap />,
    color: "#6366f1",
  },
  {
    name: "Clothes",
    value: 35,
    icon: <FaTshirt />,
    color: "#8b5cf6",
  },
];

const MonthlyBudget = () => {
  return (
    <div className="budget-container">
      <h2>Monthly Budgets</h2>

      {budgetData.map((item, index) => (
        <div key={index} className="budget-item">
          
          {/* Top Row */}
          <div className="budget-header">
            <div className="left">
              <div
                className="icon-circle"
                style={{ backgroundColor: item.color }}
              >
                {item.icon}
              </div>
              <span>{item.name}</span>
            </div>

            <div className="right">
              <span className="value">{item.value}</span>
              <span className="total"> / 100</span>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="progress-bar">
            <div
              className="progress-fill"
              style={{
                width: `${item.value}%`,
                backgroundColor: item.color,
              }}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default MonthlyBudget;
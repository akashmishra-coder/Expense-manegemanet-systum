import "./KpiCard.css";
import { IoWalletOutline } from "react-icons/io5";

const KpiCards = ({ item }) => {
  const { name, value } = item;

  return (
    <div className="kpi-card">
      <div className="kpi-header">
        <span className="kpi-title">{name}</span>
        <IoWalletOutline className="kpi-icon" />
      </div>

      <h2 className="kpi-value">₹ {value}</h2>

      <div className="kpi-footer">
        <span className="positive">↑ 2.5%</span>
        <span className="last-month">Last month ₹21,000</span>
      </div>
    </div>
  );
};

export default KpiCards;
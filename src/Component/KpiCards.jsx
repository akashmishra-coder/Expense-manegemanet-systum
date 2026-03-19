import { IoWalletOutline } from "react-icons/io5";

const KpiCards = ({ item }) => {
  const { name, value, bgColor } = item;

  return (
    <div
      style={{
        color: "white",
        borderRadius: "12px",
        background: bgColor,
        padding: "15px",
        width: "160px",
        textAlign: "center",
        boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
      }}
    >
      
      <h4 style={{ marginBottom: "10px", fontSize:"20px" }}><IoWalletOutline /> {name}</h4>
      <h2 style={{ fontSize: "22px" }}>₹{value}</h2>
    </div>
  );
};

export default KpiCards;
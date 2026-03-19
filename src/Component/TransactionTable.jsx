import "./TransactionTable.css";

const TransactionTable = ({
  transactions,
  setTransactions,
  fromDate,
  toDate,
  typeFilter,
  setFromDate,
  setToDate,
  setTypeFilter,
}) => {
  const handleDelete = (id) => {
    const updated = transactions.filter((item) => item.id !== id);
    setTransactions(updated);
  };

  const handleReset = () => {
    setFromDate("");
    setToDate("");
    setTypeFilter("all");
  };

  return (
    <div className="table-container">
      <div className="table-header">
        <h2>Transactions History</h2>

        <div className="filter-box">
          <input
            type="date"
            value={fromDate}
            onChange={(e) => setFromDate(e.target.value)}
          />

          <input
            type="date"
            value={toDate}
            onChange={(e) => setToDate(e.target.value)}
          />

          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
          >
            <option value="all">All</option>
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>

          <button onClick={handleReset} className="reset-btn">
            Reset
          </button>
        </div>
      </div>

      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Type</th>
            <th>Category</th>
            <th>Amount</th>
            <th>Payment</th>
            <th>Note</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {transactions.length === 0 ? (
            <tr>
              <td colSpan="7" className="no-data">
                No transactions found
              </td>
            </tr>
          ) : (
            transactions.map((item) => (
              <tr key={item.id}>
                <td>{item.date}</td>
                <td className={item.type === "income" ? "income" : "expense"}>
                  {item.type}
                </td>
                <td>{item.category}</td>
                <td>₹{item.amount}</td>
                <td>{item.paymentMethod}</td>
                <td>{item.note}</td>
                <td>
                  <button
                    className="delete-btn"
                    onClick={() => handleDelete(item.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default TransactionTable;
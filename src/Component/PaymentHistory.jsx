import React from 'react';
import './PaymentHistory.css';
import { Link } from 'react-router-dom';
import { useTransactions } from '../Context/TransactionContext';
const PaymentHistory = () => {
  // 1. Pull the global transactions from our Context
  const { transactions } = useTransactions();

  // 2. Sort by date (newest first) and grab exactly 5 items
  const recentTransactions = [...transactions]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 5);

  return (
    <div className="dashboard-container">
      {/* Right Column: Payments History */}
      <div className="card payments-card">
        <div className="payments-header">
          <h2 className="card-title">Payment History</h2>
          {/* Make sure the 'to' link matches your actual route in App.js */}
          <Link to="/expense-history" className="see-more">
            See more
          </Link>
        </div>

        <div className="payments-list">
          {recentTransactions.length === 0 ? (
            <p style={{ textAlign: 'center', color: '#888', padding: '20px 0' }}>
              No recent transactions
            </p>
          ) : (
            recentTransactions.map((payment) => (
              <div className="payment-item" key={payment.id}>
                <div className="payment-info">
                  {/* Using the actual category (or vendor) from your data structure */}
                  <h3 className="payment-title">{payment.category || payment.vendor}</h3>
                  <span className="payment-date">{payment.date}</span>
                </div>
                
                <div className="payment-details">
                  {/* Add a + or - based on the type, and add your currency symbol */}
                  <span className="payment-amount" style={{ color: payment.type === 'expense' ? 'red' : 'green'}}>
                    {payment.type === 'income' ? '+' : '-'}₹{payment.amount}
                  </span>
                  
                  <span className={`status-badge status-${payment.status?.toLowerCase()}`}>
                    {payment.status}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default PaymentHistory;
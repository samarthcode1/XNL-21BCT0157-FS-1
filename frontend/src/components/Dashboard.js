import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Dashboard = () => {
  const [balance, setBalance] = useState(0);
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3002/balance', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        setBalance(response.data.balance);
        setTransactions(response.data.transactions);
      } catch (error) {
        alert('Failed to fetch data');
      }
    };
    fetchData();
  }, []);

  return (
    <div className="dashboard">
      <h2>Dashboard</h2>
      <p>Balance: ${balance}</p>
      <h3>Transactions</h3>
      <ul>
        {transactions.map((transaction, index) => (
          <li key={index}>
            {transaction.from} → {transaction.to}: ${transaction.amount}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;
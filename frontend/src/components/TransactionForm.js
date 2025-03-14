import React, { useState } from 'react';
import axios from 'axios';

const TransactionForm = () => {
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [amount, setAmount] = useState('');

  const handleTransfer = async () => {
    try {
      await axios.post('http://localhost:3002/transfer', { from, to, amount }, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      alert('Transfer successful');
    } catch (error) {
      alert('Transfer failed');
    }
  };

  return (
    <div>
      <h2>Transfer Money</h2>
      <input
        type="text"
        placeholder="From"
        value={from}
        onChange={(e) => setFrom(e.target.value)}
      />
      <input
        type="text"
        placeholder="To"
        value={to}
        onChange={(e) => setTo(e.target.value)}
      />
      <input
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <button onClick={handleTransfer}>Transfer</button>
    </div>
  );
};

export default TransactionForm;
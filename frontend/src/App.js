import React from 'react';
import './App.css';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import TransactionForm from './components/TransactionForm';
import Notifications from './components/Notifications';

const App = () => {
  return (
    <div className="container">
      <h1>Fintech Platform</h1>
      <div className="form-container">
        <Login />
      </div>
      <div className="form-container">
        <Register />
      </div>
      <div className="form-container">
        <Dashboard />
      </div>
      <div className="form-container">
        <TransactionForm />
      </div>
      <div className="notifications">
        <Notifications />
      </div>
    </div>
  );
};

export default App;
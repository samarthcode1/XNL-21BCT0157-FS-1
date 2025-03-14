import React from 'react';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import TransactionForm from './components/TransactionForm';
import Notifications from './components/Notifications';

const App = () => {
  return (
    <div>
      <h1>Fintech Platform</h1>
      <Login />
      <Register />
      <Dashboard />
      <TransactionForm />
      <Notifications />
    </div>
  );
};

export default App;
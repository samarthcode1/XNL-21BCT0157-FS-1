import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:3002');

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    socket.on('transaction', (transaction) => {
      setNotifications([...notifications, transaction]);
    });
  }, [notifications]);

  return (
    <div className="notifications">
      <h2>Notifications</h2>
      <ul>
        {notifications.map((notification, index) => (
          <li key={index}>
            <strong>From:</strong> {notification.from} <br />
            <strong>To:</strong> {notification.to} <br />
            <strong>Amount:</strong> ${notification.amount}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Notifications;
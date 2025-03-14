require('dotenv').config();
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const { Kafka } = require('kafkajs'); // Import Kafka

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

const kafka = new Kafka({
  clientId: 'fintech-app',
  brokers: ['localhost:9092'],
});

const producer = kafka.producer();

const sendTransactionEvent = async (transaction) => {
  await producer.connect();
  await producer.send({
    topic: 'transactions',
    messages: [{ value: JSON.stringify(transaction) }],
  });
  await producer.disconnect();
};

const port = 3002;

app.use(express.json());

io.on('connection', (socket) => {
  console.log('New client connected');
  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

app.post('/transfer', (req, res) => {
  const transaction = req.body;
  sendTransactionEvent(transaction);
  io.emit('transaction', transaction); // Emit event to all clients
  res.send('Transaction initiated');
});

server.listen(port, () => {
  console.log(`Transaction Service running on port ${port}`);
});
const express = require('express');
const { sendTransactionEvent } = require('../../kafka/producer');
const app = express();
const port = 3002;

app.use(express.json());

app.post('/transfer', (req, res) => {
  const transaction = req.body;
  sendTransactionEvent(transaction); // Send event to Kafka
  res.send('Transaction initiated');
});

app.listen(port, () => {
  console.log(`Transaction Service running on port ${port}`);
});
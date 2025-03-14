const { Kafka } = require('kafkajs');
const mongoose = require('mongoose');
const Account = require('../models/Account'); // Import the Account model

const kafka = new Kafka({
  clientId: 'fintech-app',
  brokers: ['localhost:9092'],
});

const consumer = kafka.consumer({ groupId: 'transaction-group' });

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/fintech', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const consumeTransactionEvents = async () => {
  await consumer.connect();
  await consumer.subscribe({ topic: 'transactions', fromBeginning: true });
  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      const transaction = JSON.parse(message.value.toString());
      console.log('Processing transaction:', transaction);

      // Update account balances
      const { from, to, amount } = transaction;
      await Account.updateOne({ userId: from }, { $inc: { balance: -amount } });
      await Account.updateOne({ userId: to }, { $inc: { balance: amount } });

      console.log('Account balances updated');
    },
  });
};

consumeTransactionEvents();
const { Kafka } = require('kafkajs');

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

module.exports = { sendTransactionEvent };
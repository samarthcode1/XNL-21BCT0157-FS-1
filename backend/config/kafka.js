const { Kafka } = require("kafkajs");
require("dotenv").config();

const kafka = new Kafka({
  clientId: "fintech-platform",
  brokers: [process.env.KAFKA_BROKER], 
});

const producer = kafka.producer();
const consumer = kafka.consumer({ groupId: "transaction-group" });

const connectKafka = async () => {
  await producer.connect();
  await consumer.connect();
  console.log("✅ Kafka Connected...");
};

module.exports = { producer, consumer, connectKafka };

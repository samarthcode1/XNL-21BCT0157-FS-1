const { producer } = require("../config/kafka");

const sendTransactionEvent = async (transaction) => {
  await producer.send({
    topic: "transaction-events",
    messages: [{ value: JSON.stringify(transaction) }],
  });
  console.log("🚀 Transaction event sent to Kafka:", transaction);
};

module.exports = { sendTransactionEvent };

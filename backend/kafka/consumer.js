const { consumer } = require("../config/kafka");
const { processTransaction } = require("../services/transactionService");

const consumeTransactionEvents = async () => {
  await consumer.subscribe({ topic: "transaction-events", fromBeginning: true });

  await consumer.run({
    eachMessage: async ({ message }) => {
      const transactionData = JSON.parse(message.value.toString());
      console.log("🔥 Consumed Transaction Event:", transactionData);
      await processTransaction(transactionData);
    },
  });
};

module.exports = { consumeTransactionEvents };

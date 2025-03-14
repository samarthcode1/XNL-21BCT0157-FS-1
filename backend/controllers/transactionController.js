const Transaction = require("../models/Transaction");
const { producer } = require("../config/kafka");

const createTransaction = async (req, res) => {
  try {
    const { userId, amount, type } = req.body;
    const transaction = new Transaction({ userId, amount, type });
    await transaction.save();

    // Send transaction event to Kafka
    await producer.send({
      topic: "transaction-events",
      messages: [{ value: JSON.stringify(transaction) }],
    });

    res.status(201).json(transaction);
  } catch (err) {
    res.status(500).json({ message: "Transaction Failed", error: err.message });
  }
};

module.exports = { createTransaction };

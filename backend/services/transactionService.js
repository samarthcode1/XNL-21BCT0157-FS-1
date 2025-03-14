const Transaction = require("../models/Transaction");

const processTransaction = async (transactionData) => {
  try {
    const transaction = new Transaction(transactionData);
    await transaction.save();
    return transaction;
  } catch (err) {
    throw new Error("Transaction processing failed");
  }
};

module.exports = { processTransaction };

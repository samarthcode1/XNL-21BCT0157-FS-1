const Transaction = require("../models/Transaction");

// Create a Transaction
exports.createTransaction = async (req, res) => {
    try {
        const { amount, type, description } = req.body;

        const transaction = new Transaction({
            user: req.user.id,
            amount,
            type,
            description,
        });

        await transaction.save();
        res.status(201).json(transaction);
    } catch (err) {
        console.error("Transaction Error:", err);
        res.status(500).json({ error: "Server Error" });
    }
};

// Get Transactions
exports.getTransactions = async (req, res) => {
    try {
        const transactions = await Transaction.find({ user: req.user.id }).sort({ date: -1 });
        res.json(transactions);
    } catch (err) {
        console.error("Transaction Retrieval Error:", err);
        res.status(500).json({ error: "Server Error" });
    }
};

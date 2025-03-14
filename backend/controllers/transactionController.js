const Transaction = require("../models/Transaction");
const User = require("../models/User");
const kafka = require("../kafka/producer"); // Kafka Producer

// @route   POST /api/transactions/initiate
// @desc    Initiate a transaction
// @access  Private
exports.initiateTransaction = async (req, res) => {
    try {
        const { amount, currency, receiverId, transactionType } = req.body;
        const senderId = req.user.id; // Extracted from authMiddleware

        // Validate sender and receiver existence
        const sender = await User.findById(senderId);
        const receiver = await User.findById(receiverId);
        if (!sender || !receiver) {
            return res.status(404).json({ error: "Sender or receiver not found" });
        }

        // Create a new transaction
        const transaction = new Transaction({
            senderId,
            receiverId,
            amount,
            currency,
            transactionType
        });

        await transaction.save();

        // Send transaction event to Kafka
        kafka.sendMessage("transaction-events", JSON.stringify(transaction));

        res.status(201).json({ 
            message: "Transaction initiated successfully",
            transaction 
        });
    } catch (error) {
        console.error("Transaction initiation failed:", error);
        res.status(500).json({ error: "Server Error" });
    }
};

// @route   GET /api/transactions/history
// @desc    Get user's transaction history
// @access  Private
exports.getUserTransactions = async (req, res) => {
    try {
        const userId = req.user.id;
        const transactions = await Transaction.find({ senderId: userId }).sort({ createdAt: -1 });

        res.json({ transactions });
    } catch (error) {
        console.error("Error fetching transactions:", error);
        res.status(500).json({ error: "Server Error" });
    }
};

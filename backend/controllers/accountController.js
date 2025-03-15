const Account = require("../models/Account");
const Transaction = require("../models/Transaction");
const User = require("../models/User");

// ✅ Get Account Balance
exports.getBalance = async (req, res) => {
    try {
        const account = await Account.findOne({ user: req.user.id });

        if (!account) {
            return res.status(404).json({ error: "Account not found" });
        }

        res.json({ balance: account.balance, currency: account.currency });
    } catch (err) {
        console.error("Error fetching balance:", err);
        res.status(500).json({ error: "Server Error" });
    }
};

// ✅ Get Transaction History
exports.getTransactionHistory = async (req, res) => {
    try {
        const transactions = await Transaction.find({ 
            $or: [{ sender: req.user.id }, { recipient: req.user.id }] 
        }).sort({ createdAt: -1 });

        res.json(transactions);
    } catch (err) {
        console.error("Error fetching transaction history:", err);
        res.status(500).json({ error: "Server Error" });
    }
};

// ✅ Transfer Funds
exports.transferFunds = async (req, res) => {
    const { recipientEmail, amount } = req.body;

    try {
        if (amount <= 0) {
            return res.status(400).json({ error: "Invalid transfer amount" });
        }

        const senderAccount = await Account.findOne({ user: req.user.id });
        if (!senderAccount || senderAccount.balance < amount) {
            return res.status(400).json({ error: "Insufficient balance" });
        }

        const recipientUser = await User.findOne({ email: recipientEmail });
        if (!recipientUser) {
            return res.status(404).json({ error: "Recipient not found" });
        }

        let recipientAccount = await Account.findOne({ user: recipientUser._id });
        if (!recipientAccount) {
            recipientAccount = new Account({ user: recipientUser._id, balance: 0 });
            await recipientAccount.save();
        }

        senderAccount.balance -= amount;
        recipientAccount.balance += amount;

        await senderAccount.save();
        await recipientAccount.save();

        const transaction = new Transaction({
            sender: req.user.id,
            recipient: recipientUser._id,
            amount,
            type: "transfer",
            status: "Completed"
        });

        await transaction.save();

        res.json({ message: "Transfer successful", transaction });
    } catch (err) {
        console.error("Error processing transfer:", err);
        res.status(500).json({ error: "Server Error" });
    }
};

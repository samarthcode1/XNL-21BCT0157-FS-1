const mongoose = require("mongoose");

const TransactionSchema = new mongoose.Schema({
    sender: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Sender's ID
    recipient: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Recipient's ID
    amount: { type: Number, required: true },
    type: { type: String, enum: ["credit", "debit", "transfer"], required: true }, // Added "transfer"
    description: { type: String },
    status: { type: String, enum: ["Pending", "Completed", "Failed"], default: "Completed" }, // Transaction status
    date: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Transaction", TransactionSchema);

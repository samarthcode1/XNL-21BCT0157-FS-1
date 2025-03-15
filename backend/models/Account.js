const mongoose = require('mongoose');

const accountSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, unique: true },
  balance: { type: Number, default: 0 },
  currency: { type: String, required: true, default: "USD" } // Multi-currency support
}, { timestamps: true });

module.exports = mongoose.model('Account', accountSchema);

const express = require("express");
const connectDB = require("./config/database");
const dotenv = require("dotenv");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const accountRoutes = require("./routes/accountRoutes");
const transactionRoutes = require("./routes/transactionRoutes");
const { protect } = require("./middleware/authMiddleware");
require("dotenv").config();

dotenv.config();
connectDB();

const app = express();
app.use(express.json()); // Middleware for JSON parsing

// Register Routes
app.use("/api/auth", authRoutes);
app.use("/api/user", protect, userRoutes);
app.use("/api/transactions", protect, transactionRoutes);
app.use("/api/account", protect, accountRoutes); // ✅ Registers account management API

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

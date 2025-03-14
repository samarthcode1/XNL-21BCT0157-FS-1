const express = require("express");
const connectDB = require("./config/database");
const dotenv = require("dotenv");

dotenv.config();
connectDB();

const app = express();
app.use(express.json()); // Middleware for JSON parsing

// Register Routes
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");

app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes); // Ensure user routes are registered

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

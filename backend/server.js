const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/database");
const { connectKafka } = require("./config/kafka");
const { consumeTransactionEvents } = require("./kafka/consumer");

dotenv.config();

const app = express();
connectDB();
connectKafka();

app.use(express.json());
app.use(cors());

app.use("/api/transactions", require("./routes/transactionRoutes"));
app.use("/api/users", require("./routes/userRoutes"));

// Start Kafka Consumer
consumeTransactionEvents();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

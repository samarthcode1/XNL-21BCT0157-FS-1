const express = require("express");
const { getBalance, getTransactionHistory, transferFunds } = require("../controllers/accountController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/balance", protect, getBalance);
router.get("/history", protect, getTransactionHistory);
router.post("/transfer", protect, transferFunds);

module.exports = router;

const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware"); // Import middleware
const { getUserProfile } = require("../controllers/userController"); // Import controller

router.get("/profile", protect, getUserProfile);

module.exports = router;

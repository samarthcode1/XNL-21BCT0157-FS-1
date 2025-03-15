const express = require("express");
const router = express.Router();
const { registerUser, loginUser } = require("../controllers/authController");

console.log("🔍 RegisterUser:", registerUser); // Debugging
console.log("🔍 LoginUser:", loginUser); // Debugging

router.post("/register", registerUser);
router.post("/login", loginUser);

module.exports = router;

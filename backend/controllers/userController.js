const User = require("../models/User");

const getUserProfile = async (req, res) => {
    try {
        const user = req.user; // User is already attached by protect middleware
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email
        });
    } catch (error) {
        console.error("Error fetching user profile:", error);
        res.status(500).json({ error: "Server Error" });
    }
};

module.exports = { getUserProfile };

const jwt = require("jsonwebtoken");
const User = require("../models/User");

const protect = async (req, res, next) => {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        try {
            token = req.headers.authorization.split(" ")[1]; // Extract token
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = await User.findById(decoded.id).select("-password"); // Attach user to req
            next();
        } catch (error) {
            console.error("JWT Verification Failed:", error.message);
            return res.status(401).json({ error: "Invalid token" });
        }
    } else {
        return res.status(401).json({ error: "No token provided" });
    }
};

module.exports = { protect };

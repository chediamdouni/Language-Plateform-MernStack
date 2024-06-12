const User = require("../models/User");
require("dotenv").config();
const jwt = require("jsonwebtoken");

const userVerification = (req, res, next) => {
  const token = req.cookies.jwt;
  if (!token) {
    console.error("Token not found in cookies");
    return res.status(401).json({ message: "Unauthorized, no token provided" });
  }
  jwt.verify(token, process.env.TOKEN_KEY, async (error, data) => {
    if (error) {
      console.error("Error verifying token:", error);
      return res.status(401).json({ message: "Unauthorized, invalid token" });
    }
    try {
      const user = await User.findById(data.userId);
      if (user) {
        req.user = user; // Attach user to request object
        return next(); // Pass the request to the next middleware/function
      } else {
        return res.status(404).json({ message: "User not found" });
      }
    } catch (err) {
      console.error("Error finding user:", err);
      return res.status(500).json({ message: "Internal server error" });
    }
  });
};

const checkRoles = (roles) => async (req, res, next) => {
  let { email } = req.body;
  const user = await User.findOne({ email });
  !roles.includes(user.roles)
    ? res.status(401).json("Sorry you do not have access to this route ")
    : next();
};

module.exports = {
  userVerification,
  checkRoles,
};

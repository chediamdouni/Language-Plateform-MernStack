const User = require("../models/User");
require("dotenv").config();
const jwt = require("jsonwebtoken");

const userVerification = async (req, res, next) => {
  console.log("Cookies:", req.cookies);
  console.log("Headers:", req.headers);

  let token = req.cookies.bearerToken;

  if (!token && req.headers.authorization) {
    const parts = req.headers.authorization.split(" ");
    if (parts.length === 2 && parts[0] === "Bearer") {
      token = parts[1];
    }
  }

  console.log("Retrieved token:", token);

  if (!token) {
    return res.status(401).json({ message: "Unauthorized, no token provided" });
  }

  try {
    const data = jwt.verify(token, process.env.JWT_SIGNING_KEY);

    const user = await User.findById(data.id);
    if (!user) {
      console.error("User not found with id:", data.id);
      return res.status(404).json({ message: "User not found" });
    }

    req.user = user;
    next();
  } catch (error) {
    if (error.name === "JsonWebTokenError") {
      console.error("Invalid token:", error);
      return res.status(401).json({ message: "Unauthorized, invalid token" });
    } else {
      console.error("Error verifying token:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }
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

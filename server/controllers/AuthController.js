const { createSecretToken } = require("../utils/SecretToken");
const User = require("../models/User");
const bcrypt = require("bcrypt");

// SIGNUP ///
const signupUser = async (req, res, next) => {
  try {
    const { username, password, email, roles } = req.body;
    const NameTaken = await User.findOne({ username });
    if (NameTaken) {
      return res.status(409).send("Username is already taken");
    }
    const validRoles = ["apprenant", "admin", "tuteur"];
    if (roles && !validRoles.includes(roles)) {
      res.status(401).send("Role invalid");
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.status(402).send("Email is already taken");
    }
    const user = await User.create({
      email,
      password,
      username,
      roles: roles.toLowerCase(),
    });
    const token = createSecretToken({ userId: user._id });
    res.cookie("jwt", token, {
      withCredentials: true,
      httpOnly: false,
    });
    res.status(201).json({ message: "User has been added successfully", user });
    next();
  } catch (error) {
    console.error("Error in signup:", error);
    res.status(500).send("There is something wrong in signup");
  }
};

// LOGIN ///
const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.json({ message: "All fields are required" });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.json({ message: "Incorrect password or email" });
    }
    const auth = await bcrypt.compare(password, user.password);
    if (!auth) {
      return res.json({ message: "Incorrect password or email" });
    }
    const token = createSecretToken({
      userId: user._id,
    });
    res.cookie("jwt", token, {
      withCredentials: true,
      httpOnly: false,
    });
    res
      .status(201)
      .json({ message: "User logged in successfully", success: true, user });
    next();
  } catch (error) {
    console.error(error);
  }
};

// USER LOGGED IN ///
const getLoggedInUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.user?._id);
    if (!user) {
      return res.status(400).json({ message: "No User Found" });
    }

    return res.status(200).json({ user });
  } catch (e) {
    res
      .status(500)
      .json({ message: "something went wrong in getLoggedInUser" });
  }
};

module.exports = {
  signupUser,
  login,
  getLoggedInUser,
};

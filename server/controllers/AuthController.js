const { createSecretToken } = require("../utils/SecretToken");
const User = require("../models/User");
const bcrypt = require("bcrypt");
const { getStreamToken, syncUser } = require("../utils/stream");

const getSuccessResponse = async (user) => ({
  user: {
    id: user._id,
    email: user.email,
    username: user.username,
  },
  bearerToken: await createSecretToken(user),
  streamToken: getStreamToken(user),
});

// SIGNUP ///
const signupUser = async (req, res, next) => {
  try {
    const { username, password, email, roles } = req.body;
    // validations
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
    await syncUser(user);
    const response = await getSuccessResponse(user);
    response.message = "User registered successfully";
    res.status(201).send(response);
    // // const token = createSecretToken({ userId: user._id });
    // // res.cookie("jwt", token, {
    // //   withCredentials: true,
    // //   httpOnly: false,
    // // });
    // // res.status(201).json({
    // //   success: true,
    // //   message: "User has been added successfully",
    // //   user,
    // // });
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
      return res.json({ message: "Incorrect email" });
    }
    const auth = await bcrypt.compare(password, user.password);
    if (!auth) {
      return res.json({ message: "Incorrect password" });
    }
    const response = await getSuccessResponse(user);
    const token = response.bearerToken;
    res.cookie("bearerToken", token, {
      withCredentials: true,
      httpOnly: true,
    });
    response.message = "Login successful";
    res.status(200).send(response);
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
    const response = await getSuccessResponse(user);

    return res.status(200).send(response);
  } catch (e) {
    res
      .status(500)
      .json({ message: "something went wrong in getLoggedInUser" });
  }
};
const logout = async (req, res) => {
  return res
    .clearCookie("bearerToken")
    .status(200)
    .json({ message: "Successfully logged out 😏 🍀" });
};

module.exports = {
  signupUser,
  login,
  getLoggedInUser,
  logout,
};

const { validationResult } = require("express-validator");
const User = require("../models/User");
const deleteFile = require("../utils/imageDelete")
// UPDATE USER  ///
const editUserProfile  = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ message: errors.array() });
    }
    const user = await User.findById(req.params.userId);
    if (!user) return res.status(404).json({ message: "User not found" });
    user.username = req.body.username?.toLocaleLowerCase();
    user.email = req.body.email?.toLocaleLowerCase();
    user.dateOfBirth = new Date(req.body.dateOfBirth);

    if (req.file) {
      if (user.profileImageUrl !== "images/default.png") {
        deleteFile(user.profileImage);
      }

      user.profileImageUrl = req.file.path;
    }

    await user.save();
    res.status(200).json(user);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "something went wrong in the editUserProfile" });
  }
};

// DELETE USER  ///
const deleteUser = async (req, res, next) => {
  try {
    let user = await User.findOneAndDelete(req.params.userId);
    if (!user) {
      return res.status(400).json({ message: "user not found " });
    }
    res.status(200).json({ message: "user deleted successfully" });
  } catch (error) {
    console.log("Error when Deleting user ", error);
  }
};

// USER DETAILS ///
const getUserInfo = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) {
      return res.status(400).json({ message: "No User Found" });
    }

    return res.status(200).json({ user });
  } catch (e) {
    res.status(500).json({ message: "something went wrong in getUserById" });
  }
};

// ALL USERS ///
const getAllUsersInfo = async (req, res, next) => {
  try {
    const users = await User.find().select("-password");
    res.status(200).json({ users });
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "no users found " });
  }
};

module.exports = {
  editUserProfile,
  deleteUser,
  getAllUsersInfo,
  getUserInfo,
};

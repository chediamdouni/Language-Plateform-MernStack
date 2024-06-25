var express = require("express");
const {
  getUserInfo,
  getAllUsersInfo,
  editUserProfile,
} = require("../controllers/UserController");
const { singleImageHandler } = require("../utils/imageUpload");
var router = express.Router();

router.get("/getUserInfo/:userId", getUserInfo);
router.get("/getAllUsersInfo", getAllUsersInfo);
router.put("/editUserProfile/:userId", editUserProfile);

module.exports = router;

var express = require("express");
const {
  getUserInfo,
  getAllUsersInfo,
  editUserProfile,
  addFavoriteTutor,
  removeFavoriteTutor,
  addFavoriteCourse,
  removeFavoriteCourse,
  getUserFavorites,
} = require("../controllers/UserController");
const { userVerification } = require("../utils/Auth");
const { singleImageHandler } = require("../utils/imageUpload");
var router = express.Router();

router.get("/getUserInfo/:userId", getUserInfo);
router.get("/getAllUsersInfo", getAllUsersInfo);
router.put("/editUserProfile/:userId", singleImageHandler, editUserProfile);

// favorites Routes
router.get("/favorites/:userId", getUserFavorites);
router.post("/favorite/tutors/add", addFavoriteTutor);
router.post("/favorite/tutors/remove", removeFavoriteTutor);
router.post("/favorite/courses/add", addFavoriteCourse);
router.post("/favorite/courses/remove", removeFavoriteCourse);

module.exports = router;

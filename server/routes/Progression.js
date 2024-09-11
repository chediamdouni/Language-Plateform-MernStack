var express = require("express");
const {
  updateProgression,
  getProgression,
  markQuizAsCompleted,
} = require("../controllers/ProgressionController");
const { userVerification } = require("../utils/Auth");
var router = express.Router();

router.get("/:userId/:courseId", getProgression);
router.post("/update/:userId/:courseId", updateProgression);
router.post("/quiz/completed", markQuizAsCompleted);
module.exports = router;

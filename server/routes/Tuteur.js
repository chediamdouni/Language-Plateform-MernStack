var express = require("express");
const {
  getAvailability,
  setAvailability,
  getAllTutors,
} = require("../controllers/TuteurController");
var router = express.Router();

router.get("/getAlltutors", getAllTutors);
router.post("/availability", setAvailability);
router.get("/availability/:tutorId", getAvailability);

module.exports = router;

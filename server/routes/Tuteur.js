var express = require("express");
const {
  getAvailability,
  setAvailability,
  getAllTutors,
  getTutorById,
} = require("../controllers/TuteurController");
var router = express.Router();

router.get("/", getAllTutors);
router.get("/:id", getTutorById);
router.post("/availability", setAvailability);
router.get("/availability/:tutorId", getAvailability);

module.exports = router;

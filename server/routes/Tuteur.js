var express = require("express");
const {
  getAvailability,
  setAvailability,
} = require("../controllers/TuteurController");
var router = express.Router();

router.post("/availability", setAvailability);
router.get("/availability/:tutorId", getAvailability);

module.exports = router;

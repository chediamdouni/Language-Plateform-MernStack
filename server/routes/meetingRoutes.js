var express = require("express");
const { createMeeting } = require("../controllers/MeetingController");
const {
  AddUpcoming,
  getUpcomingMeeting,
  deleteUpcomingMeeting,
} = require("../controllers/UpcomingController");
var router = express.Router();

router.post("/", createMeeting);
router.post("/upcoming", AddUpcoming);
router.get("/GetUpcoming/:userId", getUpcomingMeeting);
router.delete("/DelUpcoming/:meetingId", deleteUpcomingMeeting);

module.exports = router;

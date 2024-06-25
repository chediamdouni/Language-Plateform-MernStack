var express = require("express");
const { createMeeting } = require("../controllers/MeetingController");
const {
  AddUpcoming,
  getUpcomingMeeting,
  deleteUpcomingMeeting,
  getAllUpcomingMeeting,
} = require("../controllers/UpcomingController");
var router = express.Router();

router.post("/", createMeeting);
router.post("/upcoming", AddUpcoming);
router.get("/GetAllUpcoming/:userId", getAllUpcomingMeeting);
router.get("/GetUpcoming/:userId", getUpcomingMeeting);
router.delete("/DelUpcoming/:upcomingMeetingId", deleteUpcomingMeeting);

module.exports = router;

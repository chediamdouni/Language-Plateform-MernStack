const mongoose = require("mongoose");

const upcomingMeetingSchema = new mongoose.Schema({
  upcoming_meeting_id: {
    type: String,
    required: true,
    unique: true,
  },
  user_id: {
    type: String,
    required: true,
    ref: "User",
  },
  meeting_time: {
    type: Date,
    required: true,
  },
  meeting_description: {
    type: String,
    required: true,
  },
  meeting_url: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("UpcomingMeeting", upcomingMeetingSchema);

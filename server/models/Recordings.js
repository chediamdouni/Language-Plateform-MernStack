const mongoose = require("mongoose");

const RecordingsSchema = new mongoose.Schema({
  filename: { type: String, unique: true },
  user_id: { type: String, ref: "User" }, 
  meeting_id: { type: String, ref: "MeetingDetails" }, 
  recording_url: String,
});

module.exports = mongoose.model("Recordings", RecordingsSchema);

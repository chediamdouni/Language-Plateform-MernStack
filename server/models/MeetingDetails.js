const mongoose = require("mongoose");

const MeetingDetailsSchema = new mongoose.Schema({
  meeting_id: { type: String, unique: true },
  creator_user_id: String,
  start_time: Date,
  end_time: Date,
  duration: String,
  participants: [String],
  num_of_participants: { type: Number, default: 0 },
});

module.exports = mongoose.model("MeetingDetails", MeetingDetailsSchema);

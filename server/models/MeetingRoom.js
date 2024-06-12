const mongoose = require("mongoose");

const MeetingRoomsSchema = mongoose.Schema(
  {
    room_meeting: {
      type: String,
      unique: true,
    },
    user_id_creator: {
      type: String,
      ref: "User",
    },
    meeting_title: {
      type: String,
    },
    meeting_description: {
      type: String,
    },
    meeting_url: {
      type: String,
    },
    room_members: [{ type: String, ref: "User" }],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("MeetingRoom", MeetingRoomsSchema);

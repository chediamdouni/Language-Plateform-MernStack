const mongoose = require("mongoose");

const ParticipantSchema = mongoose.Schema(
  {
    participant_id: {
      type: String,
      required: true,
    },
    meeting_id: {
      type: String,
      ref: "MeetingDetails",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

ParticipantSchema.index({ participant_id: 1, meeting_id: 1 }, { unique: true });

module.exports = mongoose.model("Participant", ParticipantSchema);

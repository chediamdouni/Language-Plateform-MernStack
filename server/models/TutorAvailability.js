const mongoose = require("mongoose");

const tutorAvailabilitySchema = new mongoose.Schema({
  tutorId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  availability: {
    type: Array,
    required: true,
    items: {
      day: {
        type: String,
        required: true,
        enum: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      },
      startTime: {
        type: String,
        required: true,
      },
      endTime: {
        type: String,
        required: true,
      },
    },
  },
});

module.exports = mongoose.model("TutorAvailability", tutorAvailabilitySchema);

const mongoose = require("mongoose");

const progressionSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Cours",
      required: true,
    },
    completedLessons: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Lesson",
      },
    ],
    completedQuizzes: [{ type: mongoose.Schema.Types.ObjectId, ref: "Quizz" }],

    completionPercentage: {
      type: Number,
      default: 0,
    },
    progress: {
      type: Number,
      default: 0,
    },
    startedAt: {
      type: Date,
      default: Date.now,
    },
    completedAt: Date,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Progression", progressionSchema);

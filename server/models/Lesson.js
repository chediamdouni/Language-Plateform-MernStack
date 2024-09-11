const mongoose = require("mongoose");

const lessonSchema = new mongoose.Schema(
  {
    titre: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    contenu: {
      type: String,
    },
    videoUrl: {
      type: String,
    },
    cours: { type: mongoose.Schema.Types.ObjectId, ref: "Cours" },
    quizzes: [{ type: mongoose.Schema.Types.ObjectId, ref: "Quizz" }],
    isCompleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Lesson", lessonSchema);

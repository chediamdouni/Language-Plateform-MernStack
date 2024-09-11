const mongoose = require("mongoose");

const quizSchema = new mongoose.Schema(
  {
    cours: { type: mongoose.Schema.Types.ObjectId, ref: "Cours" },
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    deadline: {
      type: Date,
      required: true,
    },
    questions: [
      {
        question: {
          type: String,
          required: true,
        },
        options: [
          {
            text: {
              type: String,
              required: true,
            },
            correct: {
              type: Boolean,
              required: true,
            },
          },
        ],
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Quizz", quizSchema);

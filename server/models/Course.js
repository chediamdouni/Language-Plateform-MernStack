const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema(
  {
    titre: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    tuteur: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    level: {
      type: String,
    },
    image: {
      type: String,
    },
    categorie: {
      type: String,
      required: true,
    },
    lessons: [{ type: mongoose.Schema.Types.ObjectId, ref: "Lesson" }],
    quizzes: [{ type: mongoose.Schema.Types.ObjectId, ref: "Quizz" }],
    prix: {
      type: Number,
      required: true,
    },
    prompts: {
      type: String,
    },
    etudiantsInscrits: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("Cours", courseSchema);

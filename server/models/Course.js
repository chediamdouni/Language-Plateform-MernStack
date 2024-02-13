const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema(
  {
    nom: {
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
    prix: {
      type: Number,
      required: true,
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

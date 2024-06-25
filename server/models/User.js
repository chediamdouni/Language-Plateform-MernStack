const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, "Your email address is required"],
      unique: true,
    },
    username: {
      type: String,
      required: [true, "Username is required"],
    },
    password: {
      type: String,
      required: [true, "Your password is required"],
    },
    roles: {
      type: String,
      default: "apprenant",
      enum: ["admin", "tuteur", "apprenant"],
    },
    dateOfBirth: {
      type: Date,
      default: null,
    },
    gender: {
      type: String,
      default: "homme",
    },
    profileImageUrl: {
      type: String,
      default: "images/default.png",
    },
    verified: {
      type: Boolean,
      required: true,
      default: false,
    },
    accountStatus: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
    },
    aboutMe: {
      type: String,
      default: "",
    },
    experience: {
      type: Number,
      default: "1",
    },
    certificate: {
      type: String,
      default: "images/default.png",
    },
    language: {
      type: String,
      default: "English",
    },
    country: {
      type: String,
      default: "English",
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function () {
  this.password = await bcrypt.hash(this.password, 12);
});
module.exports = mongoose.model("User", userSchema);

const mongoose = require("mongoose");

const RequestSchema = new mongoose.Schema({
  user_id: { type: String, required: true, ref: "User" },
  user_name: { type: String, required: true, ref: "User" },
  tutor_id: { type: String, required: true, ref: "User" },
  tutor_name: { type: String, required: true, ref: "User" },
  meeting_time: { type: Date, required: true },
});

module.exports = mongoose.model("Request", RequestSchema);

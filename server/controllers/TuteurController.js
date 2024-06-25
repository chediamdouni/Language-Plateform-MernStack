const TutorAvailability = require("../models/TutorAvailability");
const User = require("../models/User");

const setAvailability = async (req, res) => {
  const { tutorId, availability } = req.body;

  try {
    const existingAvailability = await TutorAvailability.findOne({ tutorId });

    if (existingAvailability) {
      existingAvailability.availability = availability;
      await existingAvailability.save();
    } else {
      const newAvailability = new TutorAvailability({ tutorId, availability });
      await newAvailability.save();
    }

    res.status(201).json({ message: "Availability set successfully !! " });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error setting availability !!" });
  }
};

const getAvailability = async (req, res) => {
  const tutorId = req.params.tutorId;
  try {
    const availability = await TutorAvailability.findOne({ tutorId });
    if (!availability) {
      return res
        .status(404)
        .json({ message: "No availability found for this tutor" });
    }
    res.status(200).json(availability);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error getting availability" });
  }
};

const getAllTutors = async (req, res) => {
  try {
    const tuteurs = await User.find({ roles: "tuteur" });
    res.status(200).json({
      status: "success",
      tuteurs,
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};
const getTutorById = async (req, res) => {
  try {
    const tuteur = await User.findById(req.params.id);

    if (!tuteur || tuteur.roles !== "tuteur") {
      return res.status(404).json({
        status: "fail",
        message: "Tuteur not found",
      });
    }

    res.status(200).json({
      status: "success",
      tuteur,
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};

module.exports = {
  setAvailability,
  getAvailability,
  getAllTutors,
  getTutorById,
};

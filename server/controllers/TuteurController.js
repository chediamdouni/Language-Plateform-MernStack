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
  // // const tutorId = req.params.tutorId;
  try {
    const availability = await TutorAvailability.findOne({ tutorId });

    if (!availability) {
      return res
        .status(404)
        .json({ message: "No availability found for this tutor" });
    }
    /*
    // Convertion de startDate et endDate strings to Date objects
    const start = new Date(startDate);
    const end = new Date(endDate);

    // Filtrer les créneaux horaires disponibles
    const filteredAvailability = availability.availability.filter((slot) => {
      // convertion des plages horraires du string au format Date Objet
      const slotDate = new Date(slot.date);

      // verification que le creneau horraires est dans l'intervalle
      return slotDate >= start && slotDate <= end;
    });
*/

    res.status(200).json(availability);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error getting availability" });
  }
};

const getAllTutors = async (req, res) => {
  try {
    const tutors = await User.find({ roles: "tuteur" }).select("-password");
    res.status(200).json(tutors);
  } catch (error) {
    console.log("il y a un probleme lors d'extraction des tuteurs !", error);
    res
      .status(500)
      .json({ message: "il y a un probleme lors d'extraction des tuteurs !" });
  }
};

module.exports = { setAvailability, getAvailability, getAllTutors };

const MeetingDetails = require("../models/MeetingDetails");
const Participant = require("../models/Participant");

const updateMeeting = async (req, res) => {
  const {
    callId,
    callOwner,
    title,
    startTime,
    endTime,
    duration,
    userParticipant,
    numOfParticipants,
  } = req.body;

  try {
    // Vérification si la réunion existe déjà
    const existingMeeting = await MeetingDetails.findOne({
      meeting_id: callId,
    });

    if (existingMeeting) {
      return res.status(201).json({ message: "La réunion existe déjà." });
    } else {
      // Création de la nouvelle réunion
      const newMeeting = await MeetingDetails.create({
        meeting_id: callId,
        creator_user_id: callOwner,
        title: title,
        start_time: startTime,
        end_time: endTime,
        duration: duration,
        num_of_participants: numOfParticipants,
      });

      // Ajout des participants
      await Promise.all(
        userParticipant.map(async (participant) => {
          await Participant.create({
            participant_id: participant,
            meeting_id: callId,
          });
        })
      );

      return res.status(201).json(newMeeting);
    }
  } catch (error) {
    console.error("Erreur lors de la création de la réunion:", error);
    return res.status(500).json({ message: "Échec de l'ajout de la réunion." });
  }
};

module.exports = {
  updateMeeting,
};

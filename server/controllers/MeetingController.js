const MeetingRoom = require("../models/MeetingRoom");

const createMeeting = async (req, res) => {
  try {
    const {
      room_meeting,
      user_id_creator,
      meeting_title,
      meeting_description,
      meeting_url,
    } = req.body;

    const existingMeeting = await MeetingRoom.findOne({ room_meeting });

    if (!existingMeeting) {
      await MeetingRoom.create({
        room_meeting,
        user_id_creator,
        meeting_title,
        meeting_description,
        meeting_url,
      });
    }
    res.status(200).send("Meetings successfully added or updated");
  } catch (error) {
    console.error("Error creating or adding meetings ", error);
    res.status(500).send("Failed to add Meetings", error);
  }
};
module.exports = { createMeeting };

const UpcomingMeeting = require("../models/UpcomingMeeting");

const AddUpcoming = async (req, res) => {
  try {
    const upcoming = req.body;
    console.log("Received data:", upcoming);
    if (!upcoming || upcoming.length === 0) {
      return res.status(400).send("No upcoming meetings data received");
    }
    for (const call of upcoming) {
      const existingUpcoming = await UpcomingMeeting.findOne({
        upcoming_meeting_id: call.upcoming_meeting_id,
      });
      console.log("Existing meeting:", existingUpcoming);
      if (!existingUpcoming) {
        const newMeeting = await UpcomingMeeting.create({
          upcoming_meeting_id: call.upcoming_meeting_id,
          user_id: call.user_id,
          meeting_time: call.meeting_time,
          meeting_description: call.meeting_description,
          meeting_url: call.meeting_url,
        });
        console.log("Created new meeting:", newMeeting);
      }
    }
    res.status(200).send("Meetings successfully added or updated");
  } catch (error) {
    console.error("Error creating or adding meetings ", error);
    res.status(500).send("Failed to add Meetings", error);
  }
};
// All upcoming by user
const getAllUpcomingMeeting = async (req, res) => {
  try {
    const userId = req.params.userId;
    if (!userId) {
      return res.status(400).json({ message: "UserId is required" });
    }
    const upcomingMeetings = await UpcomingMeeting.find({
      user_id: userId,
      meeting_time: { $gt: new Date() },
    }).sort({ meeting_time: 1 });

    res.status(200).json(upcomingMeetings);
  } catch (error) {
    console.error("Error fetching upcoming meetings:", error);
    res.status(500).send("Error fetching upcoming meetings");
  }
};
// les upcomings du jour actuel
const getUpcomingMeeting = async (req, res) => {
  try {
    const userId = req.params.userId;

    const startDay = new Date();
    startDay.setHours(0, 0, 0, 0);

    const endDay = new Date();
    endDay.setHours(23, 59, 59, 999);

    const upcomingMeeting = await UpcomingMeeting.findOne({
      user_id: userId,
      meeting_time: { $gte: startDay, $lt: endDay }, // supérieur a la date actuelle
    }).sort({ meeting_time: 1 }); // sort d'une façon ascendente ( de bas vers le haut )

    res.status(200).json(upcomingMeeting);
  } catch (error) {
    console.error("Error reading the database:", error);
    res.status(500).send("Error reading the database");
  }
};

const deleteUpcomingMeeting = async (req, res) => {
  try {
    const upcomingMeetingId = req.params.upcomingMeetingId;
    const result = await UpcomingMeeting.findOneAndDelete({
      upcoming_meeting_id: upcomingMeetingId,
    });

    if (!result) {
      return res.status(404).json({ message: "Meeting not found" });
    }

    res.status(200).send("Deleted this upcoming");
  } catch (error) {
    console.error("Error deleting the database:", error);
    res.status(500).send("Error deleting the database");
  }
};
module.exports = {
  getUpcomingMeeting,
  deleteUpcomingMeeting,
  getAllUpcomingMeeting,
  AddUpcoming,
};

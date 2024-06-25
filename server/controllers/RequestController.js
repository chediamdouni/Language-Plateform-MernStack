const Request = require("../models/Request");

const AddRequest = async (req, res) => {
  console.log(req.body);
  const { user_id, tutor_id, tutor_name, meeting_time } = req.body;
  if (!user_id || !tutor_id || !meeting_time) {
    return res.status(400).json({ message: "Please fill all the fields" });
  }
  try {
    const newRequest = new Request({
      user_id,
      tutor_id,
      tutor_name,
      meeting_time,
    });
    await newRequest.save();
    return res
      .status(201)
      .json({ message: "request created successfully", request: newRequest });
  } catch (error) {
    console.error("error creating request:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

const getRequestByUserId = async (req, res) => {
  const { user_id } = req.params;
  try {
    const requests = await Request.find({
      user_id,
      meeting_time: { $gt: new Date() },
    });
    res.status(200).json(requests);
  } catch (error) {
    console.error("error fetching requests by userId:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
const getRequestByTutorId = async (req, res) => {
  const { tutor_id } = req.params;
  try {
    const requests = await Request.find({ tutor_id });
    res.status(200).json(requests);
  } catch (error) {
    console.error("error fetching requests by tutorId:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
const getAllRequests = async (req, res) => {
  try {
    const requests = await Request.find();
    return res.status(200).json(requests);
  } catch (error) {
    console.error("Error fetching all requests:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
module.exports = {
  AddRequest,
  getRequestByUserId,
  getRequestByTutorId,
  getAllRequests,
};

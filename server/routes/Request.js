var express = require("express");
const {
  AddRequest,
  getRequestByUserId,
  getRequestByTutorId,
  getAllRequests,
} = require("../controllers/RequestController");

var router = express.Router();

router.get("/", getAllRequests);
router.post("/add", AddRequest);
router.get("/user/:user_id", getRequestByUserId);
router.get("/tutor/:tutor_id", getRequestByTutorId);

module.exports = router;

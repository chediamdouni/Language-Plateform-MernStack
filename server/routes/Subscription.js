const express = require("express");
const {
  updateSubscription,
  checkSubscriptionStatus,
  updateUsedTime,
} = require("../controllers/SubscriptionController");
const router = express.Router();

router.post("/update", updateSubscription);
router.get("/status/:userId", checkSubscriptionStatus);
router.post("/update-used-time/:userId/:meetingId", updateUsedTime);

module.exports = router;

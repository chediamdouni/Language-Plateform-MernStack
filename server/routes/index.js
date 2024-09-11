var express = require("express");
var router = express.Router();

var authRouter = require("./Auth");
var usersRouter = require("./users");
var coursesRouter = require("./Course");
var tuteurRouter = require("./Tuteur");
var meetRouter = require("./meetingRoutes");
var requestRouter = require("./Request");
var progressionRouter = require("./Progression");
var paymentRouter = require("./paymentRoutes");
var subscriptionRoutes = require("./Subscription");
{
  /* main Routes for the application */
}
router.use("/auth", authRouter);
router.use("/users", usersRouter);
router.use("/courses", coursesRouter);
router.use("/tuteur", tuteurRouter);
router.use("/meet", meetRouter);
router.use("/progression", progressionRouter);
router.use("/payment", paymentRouter);
router.use("/subscription", subscriptionRoutes);
router.use("/request", requestRouter);

module.exports = router;

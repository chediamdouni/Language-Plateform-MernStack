var express = require("express");
var router = express.Router();

var authRouter = require("./Auth");
var usersRouter = require("./users");
var coursesRouter = require("./Course");

router.use("/auth", authRouter);
router.use("/users", usersRouter);
router.use("/courses", coursesRouter);

module.exports = router;

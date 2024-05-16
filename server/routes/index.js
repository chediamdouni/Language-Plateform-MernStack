var express = require("express");
var router = express.Router();

var authRouter = require("./Auth");
var usersRouter = require("./users");
var coursesRouter = require("./Course");
var tuteurRouter = require("./Tuteur");

router.use("/auth", authRouter);
router.use("/users", usersRouter);
router.use("/courses", coursesRouter);
router.use("/tuteur", tuteurRouter);

module.exports = router;

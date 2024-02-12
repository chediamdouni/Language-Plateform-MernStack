var express = require("express");
var router = express.Router();
var authRouter = require("./Auth");
var usersRouter = require("./users");

router.use("/auth", authRouter);
router.use("/users", usersRouter);

module.exports = router;

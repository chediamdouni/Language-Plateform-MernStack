var express = require("express");
const {
  login,
  signupUser,
  getLoggedInUser,
} = require("../controllers/AuthController");
const { userVerification, checkRoles } = require("../utils/Auth");

var router = express.Router();


router.get("/", userVerification);
// login Routes
router.get("/loggedInUser", userVerification, getLoggedInUser);
router.post("/login/admin", checkRoles("admin"), login);
router.post("/login/tuteur", checkRoles("tuteur"), login);
router.post("/login/apprenant", checkRoles("apprenant"), login);

// signUp Routes
router.post("/signup/apprenant", (req, res, next) => {
  (req.body.roles = "apprenant"), signupUser(req, res, next, "apprenant");
});
router.post("/signup/admin", (req, res, next) => {
  (req.body.roles = "admin"), signupUser(req, res, next, "admin");
});
router.post("/signup/tuteur", (req, res, next) => {
  (req.body.roles = "tuteur"), signupUser(req, res, next, "tuteur");
});

module.exports = router;

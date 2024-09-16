var express = require("express");
const {
  login,
  signupUser,
  getLoggedInUser,
  logout,
  verifyEmail,
  resendVerificationEmail,
} = require("../controllers/AuthController");
const { userVerification, checkRoles } = require("../utils/Auth");
const passport = require("passport");
const { createSecretToken } = require("../utils/SecretToken");

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
router.get("/verify-email", verifyEmail);
router.post("/resend-verification-email", resendVerificationEmail);

//Google Authentification
router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);

router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect:
      "https://language-plateform-mern-stack.vercel.app/apprenant/connexion",
  }),
  async (req, res) => {
    console.log("Google callback triggered");
    if (!req.user) {
      console.log("No user found in the request");
      return res.redirect("/");
    }

    try {
      const token = await createSecretToken(req.user);
      console.log("Token created:", token);

      res.cookie("bearerToken", token, {
        httpOnly: true,
        secure: "production",
        sameSite: "strict",
      });

      console.log("Cookie set, redirecting to frontend");
      res.redirect("http://localhost:3000/auth/google/callback");
    } catch (error) {
      console.error("Error creating token:", error);
      res.redirect("/");
    }
  }
);
// logout
router.get("/logout", userVerification, logout);

module.exports = router;

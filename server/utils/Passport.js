const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const User = require("../models/User");

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:5000/api/auth/google/callback",
    },

    async (accessToken, refreshToken, profile, done) => {
      console.log("Google Strategy Called");
      console.log("Profile:", JSON.stringify(profile, null, 2));
      try {
        let user = await User.findOne({ email: profile.emails[0].value });
        console.log("Existing user:", user);

        if (user) {
          user.username = profile.displayName;
          user.profileImage = profile.photos[0].value;
          await user.save();
          return done(null, user);
        }
        console.log("Creating new user");
        // Si l'utilisateur n'existe pas, créez-en un nouveau
        user = new User({
          email: profile.emails[0].value,
          username: profile.displayName,
          profileImage: profile.photos[0].value,
          roles: "apprenant",
          verified: profile.emails[0].verified,
        });

        await user.save();
        console.log("New user created:", user);

        done(null, user);
      } catch (error) {
        console.error("Error in Google Strategy:", error);

        done(error, null);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});

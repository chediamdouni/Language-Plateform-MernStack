const createError = require("http-errors");
const http = require("http");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");
const mongoose = require("mongoose");
const session = require("express-session");
const passport = require("passport");
const dotenv = require("dotenv");

// Load environment variables
dotenv.config();

// Import custom modules
require("./utils/Passport");
const mainRouter = require("./routes/index");
const { syncUsers } = require("./utils/stream");
const User = require("./models/User");

// Set up MongoDB connection
mongoose.set("strictQuery", false);
mongoose
  .connect(process.env.URI_MONGO, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(async () => {
    console.log("DB Connected");
    syncUsers(await User.find({}));
  })
  .catch((error) => {
    console.log(`Error ${error.message}`);
  });

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 5000;

// CORS configuration
const corsOptions = {
  origin: "https://language-plateform-mern-stack.vercel.app",
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  optionSuccessStatus: 200,
};

// Middleware setup
app.use(cors(corsOptions));
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: process.env.NODE_ENV === "production",
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    },
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/api", mainRouter);

// Error handling middleware
app.use((req, res, next) => {
  next(createError(404));
});

// Error handler
app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};
  res.status(err.status || 500);
  // res.render("error"); // Uncomment if you have an error view
});

// Start the server
const server = http.Server(app);
server.listen(PORT, () => {
  console.log(`Server Connected to port ${PORT}`);
});

module.exports = app;

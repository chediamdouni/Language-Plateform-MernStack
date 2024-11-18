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
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");

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
	// poolSize: 10,  // Set connection pool size to 10
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

app.set("trust proxy", 1);
// CORS configuration
const corsOptions = {
  origin: function (origin, callback) {
    const allowedDomains = [
      "https://language-plateform-mern-stack.vercel.app",
      "http://localhost:3000",
      "http://localhost:3001"
    ];
    
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    // Allow any subdomain of vercel.app
    if (origin.endsWith('.vercel.app') || allowedDomains.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
  allowedHeaders:
    "Origin, X-Requested-With, Content-Type, Accept, Authorization",
  optionSuccessStatus: 200,
};
/* const limiter = rateLimit({
     windowMs: 15 * 60 * 1000,
   max: 100,
});*/
// Middleware setup
app.use(cors(corsOptions));
app.options("*", cors(corsOptions));
app.use(logger("dev"));
app.use(express.json());
app.use(helmet());
// app.use(limiter);
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
  // console.error(err.stack);
  res.status(err.status || 500).json({
    message: err.message,
    error: req.app.get("env") === "development" ? err : {},
  });
});

// Start the server
const server = http.Server(app);
server.listen(PORT, () => {
  console.log(`Server Connected to port ${PORT}`);
});

module.exports = app;

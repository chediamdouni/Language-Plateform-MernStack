const { createSecretToken, getUserIdFromJWT } = require("../utils/SecretToken");
const User = require("../models/User");
const bcrypt = require("bcrypt");
const { getStreamToken, syncUser } = require("../utils/stream");
const { sendVerificationEmail } = require("../utils/SendEmail");
const jwt = require("jsonwebtoken");

const getSuccessResponse = async (user) => {
  // Convertir le document Mongoose en objet JavaScript simple
  const userObject = user.toObject();

  // Supprimer le mot de passe pour des raisons de sécurité
  delete userObject.password;

  // Transformer _id en id
  userObject.id = userObject._id.toString();
  delete userObject._id;

  return {
    user: userObject,
    bearerToken: await createSecretToken(user),
    streamToken: getStreamToken(user),
  };
};
// SIGNUP ///
const signupUser = async (req, res, next) => {
  try {
    const { username, password, email, roles } = req.body;
    // validations
    const NameTaken = await User.findOne({ username });
    if (NameTaken) {
      return res.status(409).send("Username is already taken");
    }
    const validRoles = ["apprenant", "admin", "tuteur"];
    if (roles && !validRoles.includes(roles)) {
      res.status(401).send("Role invalid");
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.status(402).send("Email is already taken");
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      email,
      password: hashedPassword,
      username,
      verified: false,
      roles: roles.toLowerCase(),
    });

    await syncUser(user);

    await sendVerificationEmail(user);

    const response = await getSuccessResponse(user);
    response.message = "User registered successfully";
    res.status(201).send(response);
  } catch (error) {
    console.error("Error in signup:", error);
    res.status(500).send("There is something wrong in signup");
  }
};

const verifyEmail = async (req, res) => {
  const { token } = req.query;
  console.log("Token reçu:", token);

  if (!token) {
    console.log("Erreur: Token manquant");
    return res.status(400).json({ success: false, message: "Token manquant" });
  }

  try {
    // console.log("Tentative de vérification du token");
    const decoded = jwt.verify(token, process.env.VERIFICATION_TOKEN_SECRET);
    // console.log("Token décodé:", decoded);

    const user = await User.findById(decoded.userId);
    // console.log("Utilisateur trouvé:", user);

    if (!user) {
      console.log("Erreur: Utilisateur non trouvé");
      return res
        .status(404)
        .json({ success: false, message: "Utilisateur non trouvé" });
    }

    if (user.verified) {
      console.log("Erreur: Compte déjà vérifié");
      return res
        .status(400)
        .json({ success: false, message: "Compte déjà vérifié" });
    }

    user.verified = true;
    await user.save();
    console.log("Compte vérifié avec succès");

    res.json({
      success: true,
      message: "Votre compte a été vérifié avec succès",
    });
  } catch (error) {
    console.error("Erreur lors de la vérification du token:", error);
    res
      .status(400)
      .json({ success: false, message: "Token invalide ou expiré" });
  }
};

const resendVerificationEmail = async (req, res) => {
  console.log("Requête reçue pour renvoyer l'email de vérification");
  console.log("Corps de la requête:", req.body);

  try {
    const { email } = req.body;

    // Vérifier si l'utilisateur existe
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "Utilisateur non trouvé" });
    }

    // Vérifier si l'utilisateur est déjà vérifié
    if (user.verified) {
      return res
        .status(400)
        .json({ success: false, message: "L'utilisateur est déjà vérifié" });
    }

    // Générer un nouveau token de vérification
    const verificationToken = jwt.sign(
      { userId: user._id },
      process.env.VERIFICATION_TOKEN_SECRET,
      { expiresIn: "1h" }
    );

    // Envoyer le nouvel email de vérification
    await sendVerificationEmail(user, verificationToken);

    res.status(200).json({
      success: true,
      message: "Email de vérification renvoyé avec succès",
    });
  } catch (error) {
    console.error("Erreur lors du renvoi de l'email de vérification:", error);
    res.status(500).json({
      success: false,
      message: "Erreur lors de l'envoi de l'email de vérification",
    });
  }
};

// LOGIN ///
const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.json({ message: "All fields are required" });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.json({ message: "Incorrect email" });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    console.log(password, user.password);
    if (!isPasswordValid) {
      return res.json({ message: "Incorrect password" });
    }
    const response = await getSuccessResponse(user);
    const token = response.bearerToken;
    console.log("NODE_ENV:", process.env.NODE_ENV);
    console.log("Setting cookie with options:", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 24 * 60 * 60 * 1000,
    });
      /*  res.cookie("bearerToken", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 24 * 60 * 60 * 1000,
      }); */
    response.message = "Login successful";
    res.status(200).send(response);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" }); // Handle errors
  }
};

// USER LOGGED IN ///
const getLoggedInUser = async (req, res) => {
  try {
    const token =
      req.cookies.bearerToken || req.headers["authorization"]?.split(" ")[1];

    console.log("Kharya ", token);

    if (!token) {
      return res
        .status(401)
        .json({ message: "Unauthorized, no token provided" });
    }

    const userId = getUserIdFromJWT(token);
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized, invalid token" });
    } 

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const response = await getSuccessResponse(user);
    return res.status(200).send(response);
  } catch (e) {
    console.error("Error in getLoggedInUser:", e.stack); // Log stack trace for more details
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// LOGOUT
const logout = async (req, res) => {
  return res
    .clearCookie("bearerToken")
    .status(200)
    .json({ message: "Successfully logged out 😏 🍀" });
};

module.exports = {
  signupUser,
  verifyEmail,
  resendVerificationEmail,
  login,
  getLoggedInUser,
  logout,
};

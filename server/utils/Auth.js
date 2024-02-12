const User = require("../models/User");
require("dotenv").config();
const jwt = require("jsonwebtoken");

const userVerification = (req, res) => {
  const token = req.cookies.jwt;
  if (!token) {
    console.error("Erreur lors de decouverte du token :", err);
    return res.json({ err, status: false });
  }
  jwt.verify(token, process.env.TOKEN_KEY, async (error, data) => {
    if (error) {  
      console.error("Erreur lors de la vérification du token :", error);
    return res.json({ error, status: false });
    } else {
      console.log("Contenu du token décrypté :", data);
      const user = await User.findById(data.userId);
      if (user) return res.json({ status: true, user: user});
      else 
      
     return res.json({ error, status: false });
    }
  });
};

const checkRoles = (roles) => async (req, res, next) => {
  let { email } = req.body;
  const user = await User.findOne({ email });
  !roles.includes(user.roles)
    ? res.status(401).json("Sorry you do not have access to this route ")
    : next();
};

module.exports = {
  userVerification,
  checkRoles,
}
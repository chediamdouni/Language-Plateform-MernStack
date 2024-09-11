require("dotenv").config();
const jwt = require("jsonwebtoken");

module.exports.createSecretToken = async (user) => {
  const secretKey = process.env.JWT_SIGNING_KEY;
  const payload = { id: user.id };
  return jwt.sign(payload, secretKey);
};
// , {
//   expiresIn: "1h",
// }
module.exports.getUserIdFromJWT = (body) => {
  const secretKey = process.env.JWT_SIGNING_KEY;
  try {
    const { id } = jwt.verify(body, secretKey);
    return id;
  } catch (error) {
    return undefined;
  }
};

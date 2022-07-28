const JWT = require("jsonwebtoken");
const createToken = (payload) => {
  const token = JWT.sign(payload, process.env.JWT_KEY, { expiresIn: "3600s" });
  return token;
};
const verifieToken = (req, res, next) => {
  const payload = req.cookies.access_token;
  if (!payload) {
    return res.status(200).json("Veuillez vous connecté");
  }
  try {
    const data = JWT.verify(payload, process.env.JWT_KEY);
    req.user = data;
    return next();
  } catch {
    return res.status(403).json("La session à expirée");
  }
};
module.exports = { createToken, verifieToken };

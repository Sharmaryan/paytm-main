const zod = require("zod");
const jwt = require("jsonwebtoken");
const JWT_SECRET = require("./config");

const authMiddleware = (req, res, next) => {
  const headers = req.headers.authorization;
  if (!headers || !headers.startsWith("Bearer ")) {
    return res.status(403).json({ message: "Invaid token" });
  }
  const token = headers.split(" ")[1];
  if (token) {
    jwt.verify(token, JWT_SECRET, (err, decoded) => {
      if (err) {
        res.status(403).json({ message: "invalid token" });
      } else {
        if (decoded.userId) {
          req.userId = decoded.userId;
          next();
        } else {
          res.status(403).json({ message: "invalid token" });
        }
      }
    });
  }
};

module.exports = { authMiddleware };

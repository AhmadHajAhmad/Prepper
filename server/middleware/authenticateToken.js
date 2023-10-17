const jwt = require("jsonwebtoken");
const secretKey = "Banana";

function authenticateToken(req, res, next) {
  const token = req.headers.usertoken;

  if (!token) {
    return res.status(401).json({ message: "Unauthorized Token" });
  }

  jwt.verify(token, secretKey, (err, user) => {
    if (err) {
      return res.status(401).json({ message: "Unauthorized Error" });
    }
    next();
  });
}

module.exports = authenticateToken;

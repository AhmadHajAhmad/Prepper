const jwt = require("jsonwebtoken");
const secretKey = "Banana";

function authenticateToken(req, res, next) {
  const token = req.cookies.jwt;
  console.log(token);

  if (!token) {
    return res.status(401).json({ message: "Unauthorized Token" });
  }
  jwt.verify(token, secretKey, (err, user) => {
    if (err) {
      return res.status(401).json({ message: "Unauthorized Error" });
    }

    // Set the authenticated user in the request for further use

    req.user = user;
    next();
  });
}

module.exports = authenticateToken;

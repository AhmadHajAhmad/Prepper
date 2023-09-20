const jwt = require("jsonwebtoken");
const secretKey = "Alpha1900";

function authenticateAdmin(req, res, next) {
  const token = req.cookies.jwt;

  if (!token) {
    return res.status(401).json({ message: "Unauthorized Token" });
  }
  jwt.verify(token, secretKey, (err, user) => {
    if (err) {
      return res.status(401).json({ message: "Unauthorized Error" });
    }

    // Set the authenticated admin in the request for further use
    req.user = user;
    next();
  });
}

module.exports = authenticateAdmin;
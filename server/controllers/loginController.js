const UserModel = require("../models/userModel");
const jwt = require("jsonwebtoken");
const secretKey = "Banana";

class LoginController {
  async loginUser(req, res) {
    try {
      const username = req.body.username;
      const password = req.body.password;

      const user = await UserModel.findOne({ username });

      if (!user || user.password !== password) {
        return res.status(401).json({ message: "Authentication failed" });
      }
      const token = jwt.sign({ userId: user._id }, secretKey, {
        expiresIn: "1h",
      });

      res.cookie("jwt", token, { httpOnly: true, maxAge: 36000000 });
      res.status(200).json({ message: "Logged in", token });
    } catch (error) {
      console.error(error);
      res.status(500).json("Internal Server error");
    }
  }
}

module.exports = LoginController;

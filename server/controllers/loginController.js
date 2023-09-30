const UserModel = require("../models/userModel");
const jwt = require("jsonwebtoken");
const secretKey = "Banana";
const adminSecretKey = "Alpha1900";

class LoginController {
  async login(req, res) {
    try {
      const username = req.body.username;
      const password = req.body.password;

      const user = await UserModel.findOne({ username });

      if (!user || user.password !== password) {
        return res.status(401).json({ message: "Authentication failed" });
      }

      let token;
      let isAdmin;
      if (user.isAdmin) {
        token = jwt.sign({ userId: user._id }, adminSecretKey, { expiresIn: "1h" });
        isAdmin = "yes"
        res.setHeader('admintoken', token);
        res.setHeader('isadmin', isAdmin);
        res.setHeader('userid', user._id);
      } else {
        token = jwt.sign({ userId: user._id }, secretKey, { expiresIn: "1h" });
        isAdmin = "no"
        res.setHeader('usertoken', token);
        res.setHeader('isadmin', isAdmin);
        res.setHeader('userid', user._id);
      }

      res.status(200).json({ message: "Logged in"});

    } catch (error) {
      console.error(error);
      res.status(500).json("Internal Server error");
    }
  }
}


module.exports = LoginController;

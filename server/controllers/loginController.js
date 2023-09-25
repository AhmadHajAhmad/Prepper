const UserModel = require("../models/userModel");
const jwt = require("jsonwebtoken");
const secretKey = "Banana";
const adminSecretKey = "Alpha1900";

class LoginController {
  // Log in implementation for users
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

      const userid = user._id;

      // send the token in the Authorization header
      // send the token in the Authorization header
      // res.header("Authorization", `Bearer ${token}`);
      res.status(200).json({ message: "Logged in", userid, token });
    } catch (error) {
      console.error(error);
      res.status(500).json("Internal Server error");
    }
  }
  // Log in implementation for admins

  async loginAdmin(req, res) {
    try {
      const username = req.body.username;
      const password = req.body.password;

      const user = await UserModel.findOne({ username });

      if (!user || user.password !== password) {
        return res.status(401).json({ message: "Authentication failed" });
      }

      if (user.isAdmin) {
        const token = jwt.sign({ userId: user._id }, adminSecretKey, {
          expiresIn: "1h",
        });

        const adminid = user._id;

        res.cookie("jwt", token, { httpOnly: true, maxAge: 36000000 });
        res.status(200).json({ message: "Logged in", token, adminid });
      } else {
        res.status(403).send("You do not have admin rights");
      }
    } catch (error) {
      console.error(error);
      res.status(500).json("Internal Server error");
    }
  }
}

module.exports = LoginController;

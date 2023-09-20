const UserModel = require("../models/userModel");
const PersonModel = require("../models/personModel");
const FoodModel = require("../models/foodModel");
const adminSecretKey = "Alpha1900";

class AdminController {
  async createAdmin(req, res) {
    try {
      const providedSecretKey = req.body.secretKey;
      if (providedSecretKey !== adminSecretKey) {
        return res.status(403).json({ error: "Unauthorized" });
      }

      const username = req.body.username;
      const password = req.body.password;
      const email = req.body.email;
      const newAdmin = new UserModel({
        username: username,
        password: password,
        email: email,
        isAdmin: true,
      });
      await newAdmin.save();
      res.status(201).json(newAdmin);
    } catch (err) {
      res.status(500).json({ error: "ERROR" });
    }
  }

  async getAdminById(req, res) {
    const id = req.params.id;

    try {
      const user = await UserModel.findById(id);
      if (!user) {
        return res.status(404).send("Admin not found");
      }
      res.status(200).send(user);
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error");
    }
  }

  async deleteById(req, res) {
    const id = req.params.id;

    try {
      const result = await UserModel.findByIdAndDelete(id);
      if (!result) {
        return res.status(404).send("Admin not found");
      }
      res.status(200).send(`Admin with ID ${id} was deleted.`);
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error");
    }
  }

  async updateByID(req, res) {
    const id = req.params.id;
    const updateData = req.body;

    try {
      const user = await UserModel.findById(id);
      if (!user) {
        return res.status(404).send("Admin not found");
      }
      const updatedUser = await UserModel.findByIdAndUpdate(id, updateData, {
        new: true,
      }); // { new: true }
      res.status(200).json(updatedUser);
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error");
    }
  }

  async getAllUsers(req, res) {
    try {
      const user = await UserModel.find({}).sort({ username: 1 }).exec();
      res.json(user);
    } catch (err) {
      res.status(500).send("IT is a fucking error");
    }
  }

  async getAllPersons(req, res) {
    try {
      const persons = await PersonModel.find({})
        .sort({ age: 1 }) // Sort by age in ascending order
        .exec();
      res.status(200).json(persons);
    } catch (err) {
      console.error(err);
      res.status(500).json({ err: "Error fetching persons" });
    }
  }

  async getAllFood(req, res) {
    try {
      const food = await FoodModel.find({}).sort({ foodname: 1 }).exec();
      res.json(food);
    } catch (err) {
      res.status(500).send(err);
    }
  }
}

module.exports = AdminController;

const UserModel = require("../models/userModel");
const PersonModel = require("../models/personModel");
const FoodModel = require("../models/foodModel");
const SupplyModel = require("../models/supplyModel");
const WaterModel = require("../models/waterModel");
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
      });
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
      res.status(500).send("Internal Server Error");
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

  async getAllSupplies(req, res) {
    try {
      const food = await SupplyModel.find({}).sort({ itemname: 1 }).exec();
      res.json(food);
    } catch (err) {
      res.status(500).send(err);
    }
  }

  // Method to delete all food
async deleteAllFood(req, res){
  try {
    const food = await FoodModel.deleteMany({});
    if (food.deletedCount > 0) {
      res.status(200).json({ message: `${food.deletedCount} food items deleted.` });
    } else {
      res.status(404).json({ message: "No food found to delete." });
    }
  } catch (error) {
    console.error("Error deleting items:", error);
    res.status(500).json({ message: "Internal server error." });
  }
}

// Method to delete all supplies
async deleteAllSupplies(req, res){
  try {
    const supplies = await SupplyModel.deleteMany({});
    if (supplies.deletedCount > 0) {
      res.status(200).json({ message: `${supplies.deletedCount} supply items deleted.` });
    } else {
      res.status(404).json({ message: "No supplies found to delete." });
    }
  } catch (error) {
    console.error("Error deleting items:", error);
    res.status(500).json({ message: "Internal server error." });
  }
}

// Method to delete all water
async deleteAllWater(req, res){
  try {
    const water = await WaterModel.deleteMany({});
    if (water.deletedCount > 0) {
      res.status(200).json({ message: `${water.deletedCount} water deleted.` });
    } else {
      res.status(404).json({ message: "No water found to delete." });
    }
  } catch (error) {
    console.error("Error deleting items:", error);
    res.status(500).json({ message: "Internal server error." });
  }
}

// Method to delete all persons
async deleteAllPersons(req, res){
  try {
    const persons = await PersonModel.deleteMany({});
    if (persons.deletedCount > 0) {
      res.status(200).json({ message: `${persons.deletedCount} person items deleted.` });
    } else {
      res.status(404).json({ message: "No persons found to delete." });
    }
  } catch (error) {
    console.error("Error deleting items:", error);
    res.status(500).json({ message: "Internal server error." });
  }
}
}

module.exports = AdminController;

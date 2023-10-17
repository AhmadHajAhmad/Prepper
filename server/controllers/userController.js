const UserModel = require('../models/userModel');
const FoodModel = require('../models/foodModel');
const SupplyModel = require('../models/supplyModel');
const PersonModel = require('../models/personModel');
const WaterModel = require('../models/waterModel');
const WaterController = require('../controllers/waterController');
const SupplyController = require('../controllers/supplyController');

class UserController {

    async createUser(req, res) {
      
    
        try {
          const username = req.body.username;
          const password = req.body.password;
          const email = req.body.email;
          const newUser = new UserModel({
            "username": username,
            "password": password,
            "email": email,
          })

          const existingUser = await UserModel.findOne({ username });
          
          if (existingUser) {
            return res.status(500).send("User already exists");
          } 

          await newUser.save();

          const waterController = new WaterController;
          waterController.createInitialWater(newUser._id);

          const supplyController = new SupplyController;
          supplyController.createInitialSupplies(newUser._id);

          res.status(201).json(newUser);
    
        } catch (err) {
          res.status(500).json({err: "ERROR"});
        }
      }
  
    async getAllUsers(req, res) {
    try {
      const user = await UserModel.find({})
      .sort({ username: 1 }).exec();
      res.json(user);
    } catch (err) {
      res.status(500).send(err);
    }
  }

  async getUserById(req, res) {
    const id = req.params.id;

    try {
        const user = await UserModel.findById(id);
        if (!user) {
            return res.status(404).send('User not found');
        }
        res.json(user);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
  }

  async deleteById(req, res) {
    const id = req.params.id;
    

    try {
      await FoodModel.deleteMany({ _userid: id });
      await SupplyModel.deleteMany({ _userid: id });
      await PersonModel.deleteMany({ _userid: id });
      await WaterModel.deleteMany({ _userid: id });
        const result = await UserModel.findByIdAndDelete(id);
        if (!result) {
            return res.status(404).send('User not found');
        }
        res.status(200).send(`User with ID ${id} was deleted.`);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
}

async updateByID(req, res){
  const id = req.params.id;
  const updateData = req.body;

  try {
    const user = await UserModel.findById(id);
    if (!user) {
        return res.status(404).send('User not found');
    }
    const updatedUser = await UserModel.findByIdAndUpdate(id, updateData, { new: true });
    res.status(200).json(updatedUser);
} catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
}
};

module.exports = UserController;
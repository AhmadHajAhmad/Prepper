const UserModel = require('../models/userModel');

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
          await newUser.save();
          res.status(201).json(newUser);
    
        } catch (err) {
          res.status(500).json({err: "ERROR"});
        }
      }
  
    async getAllUsers(req, res) {
    try {
      const user = await UserModel.find({});
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
    const updatedUser = await UserModel.findByIdAndUpdate(id, updateData, { new: true });  // { new: true }
    res.status(200).json(updatedUser);
} catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
}

};

module.exports = UserController;
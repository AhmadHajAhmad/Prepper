const FoodModel = require('../models/foodModel');

class FoodController {

    async createFood(req, res) {
    
        try {
          const foodname = req.body.foodname;
          const calories = req.body.calories;
          const weight = req.body.weight;
          const userid = req.body.userid;
          const newFood = new FoodModel({
            "foodname": foodname,
            "calories": calories,
            "weight": weight,
            "userid": userid
          })
          await newFood.save();
          res.status(201).json(newFood);
    
        } catch (err) {
          res.status(500).json({err: "ERROR"});
        }
      }
  
    async getAllFood(req, res) {
    try {
      const food = await FoodModel.find({});
      res.json(food);
    } catch (err) {
      res.status(500).send(err);
    }
  }

  async getFoodById(req, res) {
    const id = req.params.id;

    try {
        const food = await FoodModel.findById(id);
        if (!food) {
            return res.status(404).send('Food not found');
        }
        res.json(food);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
  }

  async deleteFoodById(req, res) {
    const id = req.params.id;

    try {
        const food = await FoodModel.findByIdAndDelete(id);
        if (!food) {
            return res.status(404).send('User not found');
        }
        res.status(200).send(`Food with ID ${id} was deleted.`);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
}

async updateFoodByID(req, res){
  const id = req.params.id;
  const updateData = req.body;

  try {
    const food = await FoodModel.findById(id);
    if (!food) {
        return res.status(404).send('Food not found');
    }
    const updatedFood = await FoodModel.findByIdAndUpdate(id, updateData, { new: true });  // { new: true }
    res.status(200).json(updatedFood);
} catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
}

};

module.exports = FoodController;
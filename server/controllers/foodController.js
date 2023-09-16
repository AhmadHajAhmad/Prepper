const FoodModel = require('../models/foodModel');

class FoodController {

    async createFood(req, res) {

      // Create food method
      console.log(req.params);
        try {
          const foodname = req.body.foodname;
          const calories = req.body.calories;
          const weight = req.body.weight;
          const userid = req.params.userid;
          const newFood = new FoodModel({
            "foodname": foodname,
            "calories": calories,
            "weight": weight,
            "_userid": userid
          })
          await newFood.save();
          res.status(201).json(newFood);
    
        } catch (err) {
          res.status(500).json({err: "Internal Server Error"});
        }
      }
      
      // Get all food in the collection, regardless of user
      async getAllFood(req, res) {
      try {
        const food = await FoodModel.find({});
        res.json(food);
      } catch (err) {
        res.status(500).send(err);
      }
    }

    //Get all food with a specific user's ID.
    async getAllFoodByUser(req, res) {
      const userid = req.params.userid;
    try {
      const food = await FoodModel.find({_userid: userid});
      res.json(food);
    } catch (err) {
      res.status(500).send(err);
    }
  }

  // Get a food entity by it's ID.
  async getByFoodId(req, res) {
    const foodid = req.params.foodid;

    try {
        const food = await FoodModel.findById(foodid);
        if (!food) {
            return res.status(404).send('Food not found');
        }
        res.json(food);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
  }

  // Get a food entity by it's ID AND the user's ID.
  async getByUserId(req, res) {
    const foodid = req.params.foodid;
    const userid = req.params.userid;
  
    try {
        const food = await FoodModel.findOne({ _userid: userid, _id: foodid });
        if (!food) {
            return res.status(404).send('Food not found');
        }
        res.json(food);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
  }

  // Delete a food entity by it's ID.
  async deleteByFoodId(req, res) {
    const id = req.params.id;

    try {
        const food = await FoodModel.findByIdAndDelete(id);
        if (!food) {
            return res.status(404).send('Food not found');
        }
        res.status(200).send(`Food with ID ${id} was deleted.`);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
}

// Delete a food entity by it's ID AND the user's ID.
async deleteByUserId(req, res) {
  const foodid = req.params.foodid;
  const userid= req.params.userid;

  try {
      const food = await FoodModel.findOneAndDelete({_userid:userid, _id:foodid});
      if (!food) {
          return res.status(404).send('Food not found');
      }
      res.status(200).send(`Food with ID ${foodid} was deleted.`);
  } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
  }
}

// Update a food entity by it's ID.
async updateByFoodID(req, res){
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

// Update a food entity by it's ID AND the user's ID.
async updateByUserID(req, res) {
  const foodid = req.params.foodid;
  const userid = req.params.userid;
  const updateData = req.body;

  try {
      const updatedFood = await FoodModel.findOneAndUpdate(
        { _id: foodid, _userid: userid },  // Filter by both foodid and userid
        updateData,  // Data to update
        { new: true }  // Option to return the new version of the document
      );

      if (!updatedFood) {
        return res.status(404).send('Food not found');
      }
      res.status(200).json(updatedFood); // Send the updated food as a response
  } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
  }
}



};

module.exports = FoodController;
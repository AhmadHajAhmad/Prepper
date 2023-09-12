const waterModel = require('../models/waterModel');
const userModel = require('../models/userModel');

class waterController {

  // Post Method: to create water documents (dependent on User Id) - Post Method
  // router.post('/water') + body contents {waterQty , u_id}
    async createWaterQty(req, res) {
    
           
        try {
          const waterQty = req.body.waterQty;

          const u_id = req.body.u_id; //reference id mapping to user id in Users collection
          
          const newWater = new waterModel({
            "waterQty": waterQty,
            "u_id": u_id,
          })
          
          await newWater.save();
          res.status(201).json(newWater);
    
        } catch (err) {
          res.status(500).json({err: "ERROR"});
        }
        
    }
  


//Method to get all added water list - Get Method General (without User id)
// router.get('/water') 
  async getAllWater(req, res) {
  try {
    const water = await waterModel.find({});
    if(water==null){
      return res.status(404).json({message: "nothing found"});
    }
      res.json(water);
    } catch (err) {
      res.status(500).send(err);
    }
  }




//Method to get water list based on user id - Get Method (with User id in url)
// router.get('/water/users/:userId')
  /*async getAllWaterByuserId(req, res) {
    try {
      const u_id = req.params.userId;
      const water = await waterModel.find({u_id});
      if(water==null){
        return res.status(404).json({message: "nothing found"});
      }
      res.json(water);
    } catch (err) {
      res.status(500).send(err);
    }
  } */ 


//Method to get water list based on water id - Get Method 
// router.get('/water/:waterId')
  async getWaterBywaterId(req, res) {
    const waterId = req.params.id;

    try {
        const water = await waterModel.findById(waterId);
        if (!water) {
            return res.status(404).send('water object not found');
        }
        res.json(water);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
  }


//Method to delete water list based on user id - Delete Method
// router.delete('/water/:waterId')
async deleteById(req, res) {
  const waterId = req.params.waterId;

  try {
      const result = await waterModel.findByIdAndDelete(waterId);
      if (!result) {
          return res.status(404).send('Water object not found');
      }
      res.status(200).send(`Water object with ID: ${waterId} was deleted.`);
  } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
  }
}



//Method to update water list based on water id - Get Method (with water id in url)
// router.get('/water/:waterId')
async updateById(req, res){
  const waterId = req.params.waterId;
  const updateData = req.body;

  try {
    const result = await waterModel.findById(waterId);
    if (!result) {
        return res.status(404).send('water not found');
    }
    const updatedUser = await waterModel.findByIdAndUpdate(waterId, updateData, { new: true });  // { new: true }
    res.status(200).json(updatedUser);
} catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
}

};

module.exports = waterController;
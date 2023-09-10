const HouseModel = require('../models/houseModel');

class HouseController {

    async createHouse(req, res) {
    
        try {
          const streetname = req.body.streetname;
          const zipcode = req.body.zipcode;
          const userid = req.body.userid;
          const newHouse = new HouseModel({
            "streetname": streetname,
            "zipcode": zipcode,
            "userid": userid,
          })
          await newHouse.save();
          res.status(201).json(newHouse);
    
        } catch (err) {
          res.status(500).json({err: "Internal Server Error"});
        }
      }
  
    async getAllHouses(req, res) {
    try {
      const house = await HouseModel.find({});
      res.json(house);
    } catch (err) {
      res.status(500).send(err);
    }
  }

  async getHouseById(req, res) {
    const id = req.params.id;

    try {
        const house = await HouseModel.findById(id);
        if (!house) {
            return res.status(404).send('Household not found');
        }
        res.json(house);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
  }

  async deleteHouseById(req, res) {
    const id = req.params.id;

    try {
        const house = await HouseModel.findByIdAndDelete(id);
        if (!house) {
            return res.status(404).send('Household not found');
        }
        res.status(200).send(`Household with ID ${id} was deleted.`);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
}

async updateFoodByID(req, res){
  const id = req.params.id;
  const updateData = req.body;

  try {
    const house = await HouseModel.findById(id);
    if (!house) {
        return res.status(404).send('Household not found');
    }
    const updatedHouse = await HouseModel.findByIdAndUpdate(id, updateData, { new: true });  // { new: true }
    res.status(200).json(updatedHouse);
} catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
}

};

module.exports = HouseController;
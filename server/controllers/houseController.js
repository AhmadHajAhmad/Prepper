const HouseModel = require('../models/houseModel');

class HouseController {

  constructor() {
    // Binding methods to the current instance of the controller
    this.handleMethodOverride = this.handleMethodOverride.bind(this);
    this.updateHouseByID = this.updateHouseByID.bind(this);
    this.deleteHouseById = this.deleteHouseById.bind(this);
}

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
      const house = await HouseModel.find({})
      .sort({ streetname: 1 }).exec();
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

  handleMethodOverride(req, res) {
    console.log("Handling method override");

    const method = req.header("X-Custom-Action");

    if (method === 'DELETE') {
        console.log("Detected DELETE");
        return this.deleteHouseById(req, res);
    } else if (method === 'PATCH') {
        console.log("Detected PATCH");
        return this.updateHouseByID(req, res);
    } else {
        // Return a default response or error if the header doesn't match expected values
        res.status(400).send("Invalid method override header");
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

async updateHouseByID(req, res){
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
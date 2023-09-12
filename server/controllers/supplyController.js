const SupplyModel = require('../models/supplyModel');

class SupplyController {

    async createSupply(req, res) {
    
        try {
          const itemname = req.body.itemname;
          const instock = req.body.instock;
          const userid = req.body.userid;
          const newSupply = new SupplyModel({
            "itemname": itemname,
            "instock": instock,
            "userid": userid,
          })
          await newSupply.save();
          res.status(201).json(newSupply);
    
        } catch (err) {
          res.status(500).json({err: "Internal Server Error"});
        }
      }
  
    async getAllSupplies(req, res) {
    try {
      const supply = await SupplyModel.find({});
      res.json(supply);
    } catch (err) {
      res.status(500).send(err);
    }
  }

  async getSupplyById(req, res) {
    const id = req.params.id;

    try {
        const supply = await SupplyModel.findById(id);
        if (!supply) {
            return res.status(404).send('Item not found');
        }
        res.json(supply);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
  }

  async deleteSupplyById(req, res) {
    const id = req.params.id;

    try {
        const supply = await SupplyModel.findByIdAndDelete(id);
        if (!supply) {
            return res.status(404).send('Item not found');
        }
        res.status(200).send(`Item with ID ${id} was deleted.`);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
}

async updateSupplyByID(req, res){
  const id = req.params.id;
  const updateData = req.body;

  try {
    const supply = await SupplyModel.findById(id);
    if (!supply) {
        return res.status(404).send('Item not found');
    }
    const updatedSupply = await SupplyModel.findByIdAndUpdate(id, updateData, { new: true });  // { new: true }
    res.status(200).json(updatedSupply);
} catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
}

};

module.exports = SupplyController;
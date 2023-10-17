const SupplyModel = require('../models/supplyModel');

class SupplyController {




// 2- All supplies by userid
  async getAllSuppliesByUser(req,res){
      const userid = req.params.userid;

    try{
      
      const supply = await SupplyModel.find({_userid: userid})
      .sort({ itemname: 1 }).exec();
      
      if(supply.length === 0){
        return res.status(404).json({ message: 'No supplies found: empty list'});
      }
      
      res.status(200).json(supply);
      
    }catch(err){
      res.status(500).json({message: "Internal Server Error - method-2!"});
    }
    
  }


//3-Get a supply doc by supplyid & userid
async getByUserId(req, res) {
  const supplyid = req.params.supplyid;
  const userid = req.params.userid;

  try {
      const supply = await SupplyModel.findOne({ _userid: userid, _id: supplyid });
      if (!supply) {
          return res.status(404).send('Item not found');
      }
      res.json(supply);
  } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
  }
}



//4-Create Supply
async createSupply(req, res) {
  try {
    const itemname = req.body.itemname;
    const instock = req.body.instock;
    const userid = req.params.userid;
    
    const newSupply = new SupplyModel({
      "itemname": itemname,
      "instock": instock,
      "_userid": userid,
    })
    await newSupply.save();
    res.status(201).json(newSupply);

  } catch (err) {
    res.status(500).json({err: "Internal Server Error"});
  }
  
}

// initial supplies created when user is created.
async createInitialSupplies(userid) {
    
  try {
    
    const batteries = new SupplyModel({
      "itemname": "Batteries Default Item",
      "instock": false,
      "_userid": userid,
    })
    await batteries.save();

    const blanket = new SupplyModel({
      "itemname": "Blanket Default Item",
      "instock": false,
      "_userid": userid,
    })
    await blanket.save();

    const backpack = new SupplyModel({
      "itemname": "Backpack Default Item",
      "instock": false,
      "_userid": userid,
    })
    await backpack.save();

  } catch (err) {
    res.status(500).json({err: "Internal Server Error"});
  }
  
}


//5-Delete a supply by its Id & UserId
async deleteByUserId(req, res) {
  const supplyid = req.params.supplyid;
  const userid= req.params.userid;

  try {
      const supply = await SupplyModel.findOneAndDelete({_userid:userid, _id:supplyid});;
      if (!supply) {
          return res.status(404).send('Item not found');
      }
      res.status(200).send(`Item with ID ${supplyid} was deleted.`);
  } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
  }
}


//6- Update a supply doc by it's ID AND the user's ID
async updateByUserId(req, res) {
  const supplyid = req.params.supplyid;
  const userid = req.params.userid;
  const updateData = req.body;

  try {
      const updatedSupply = await SupplyModel.findOneAndUpdate(
        { _id: supplyid, _userid: userid },
        updateData,
        { new: true }
      );

      if (!updatedSupply) {
        return res.status(404).send('Supply item not found');
      }
      res.status(200).json(updatedSupply);
  } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
  }
}
};

module.exports = SupplyController;
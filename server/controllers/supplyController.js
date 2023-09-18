const SupplyModel = require('../models/supplyModel');

class SupplyController {




// 2- All supplies by userid
  async getAllSuppliesByUser(req,res){

    //await res.send(`getAllSuppliesByUser: ${req.params.userid}`);
    
      const userid = req.params.userid;

    try{
      
      const supply = await SupplyModel.find({_userid: userid});
      
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

  //await res.send(`getAllSuppliesByUser: ${req.params.userid}`);
    
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
        { _id: supplyid, _userid: userid },  // Filter by both user & supply id
        updateData,  // Data to update
        { new: true }  // Option to return the new version of the document
      );

      if (!updatedSupply) {
        return res.status(404).send('Supply item not found');
      }
      res.status(200).json(updatedSupply); // Send the updated supply as a response
  } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
  }
}

/*
//Update a supply doc by it's supplyid
async updateSupplyByID(req, res){
  const supplyid = req.params.supplyid;
  const updateData = req.body;

  try {
    const supply = await SupplyModel.findById(supplyid);
    if (!supply) {
        return res.status(404).send('Item not found');
    }
    const updatedSupply = await SupplyModel.findByIdAndUpdate(supplyid, updateData, { new: true });  // { new: true }
    res.status(200).json(updatedSupply);
} catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
}
*/

/*
//not applicable - All supplies without userid
  async getAllSupplies(req, res) {
    try {
      
      //res.json({message: 'getAllSuppies'});
      
      const supply = await SupplyModel.find({});
      res.json(supply);
      

    } catch (err) {
      res.status(500).json({message: "Internal Server Error - method-1!"});
    }
  }
*/


/*
//implement 
// create supply by userid - router.post('/users/:userid', controller.createSupplyByUserId);
async createSupplyByUserId(req, res) {
      
      const userid = req.params.userid;

  try {
      //res.json({message: `createSupplyByUserid: ${userid}`});
      
      const newSupply = new SupplyModel({
        "itemname": "test item 1",
        "instock": true,
        "userid": "64ff1022b6b6bf787d9b138c"
     }
     )




      const supply = await SupplyModel.findById(supplyid);
      if (!supply) {
          return res.status(404).send('Item not found');
      }
      res.json(supply);
      
  } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
  }
  
}
*/



};

module.exports = SupplyController;
//const waterModel = require('../models/waterModel');
const waterModel = require('../models/waterModel');

class waterController {

  
// 2- All water by userid
async getAllWaterByUser(req,res){

  //await res.send(`getAllWaterByUser: ${req.params.userid}`);
  
  const userid = req.params.userid;

  try{
    
    const water = await waterModel.find({_userid: userid})
    .sort({ waterqty: 1 }).exec();
    
    if(water.length==0){
      return res.status(404).json({ message: 'No water item found: empty list'});
    }
    
    res.status(200).json(water);
    
  }catch(err){
    res.status(500).json({message: "Internal Server Error - method-2!"});
  }

  
}




//3-Get water doc by waterid & userid
async getByUserId(req, res) {
  //await res.send(`getByUserId: ${req.params.userid}`);
  
  const waterid = req.params.waterid;
  const userid = req.params.userid;

  try {
      const water = await waterModel.findOne({ _userid: userid, _id: waterid });
      if (water.length==0) {
          return res.status(404).send('water Item not found');
      }
      res.json(water);
  } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
  }
  
}





//4- Create water
async createWater(req, res) {

  //await res.send(`createWater: ${req.params.userid}`);
    
  try {
    const waterqty = req.body.waterqty;
    
    const userId = req.params.userid;
    
    const newWater = new waterModel({
      "waterqty": waterqty,
      "_userid": userId
    })

    await newWater.save();

    res.status(201).json(newWater);

  } catch (err) {
    res.status(500).json({err: "Internal Server Error"});
  }
  
}

// Method for creating an initial water object upon user creation
async createInitialWater(userid) {
  try {  
    const newWater = new waterModel({
      "waterqty": 0,
      "_userid": userid
    })
    await newWater.save();
  } catch (err) {
    res.status(500).json({err: "Internal Server Error"});
  }
  
}




//5-Delete a water by waterid & UserId
async deleteByUserId(req, res) {

  //await res.send(`deleteByUserId: ${req.params.userid}`);
  
  const waterid = req.params.waterid;
  const userid= req.params.userid;

  try {
      const water = await waterModel.findOneAndDelete({_userid:userid, _id:waterid});;
      if (water.length==0) {
          return res.status(404).send('water Item not found');
      }
      res.status(200).send(`Item with ID ${waterid} was deleted.`);
  } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
  }
  
}





//6- Update a water doc by waterid & userid
async updateByUserId(req, res) {
  //await res.send(`updateByUserId: ${req.params.userid}`);
  
  const waterid = req.params.waterid;
  const userid = req.params.userid;
  const updateData = req.body;

  try {
      const updatedWater = await waterModel.findOneAndUpdate(
        { _id: waterid, _userid: userid },  // Filter by both user & water id
        updateData,  // Data to update
        { new: true }  // Option to return the new version of the document
      );

      if (!updatedWater) {
        return res.status(404).send('Supply item not found');
      }
      res.status(200).json(updatedWater); // Send the updated supply as a response
  } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
  }
  
}

};

module.exports = waterController;
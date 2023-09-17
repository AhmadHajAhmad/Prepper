const express = require('express');
const SupplyController = require('../controllers/supplyController');
const authenticate = require("../middleware/authenticateToken");

const router = express.Router({ mergeParams: true });
const controller = new SupplyController();

// 2- All supplies by userid
router.get('/', controller.getAllSuppliesByUser); //2 - verified

//3-Get a supply doc by supplyid & userid
router.get('/:supplyid', controller.getByUserId);//3 - verified

//4- Create Supply
router.post('/', controller.createSupply);//4 - verified


//5-Delete a supply by itsId & UserId
router.delete('/:supplyid', controller.deleteByUserId);//5-done - verified

//6- Update a supply doc by it's ID AND the user's ID
router.patch('/:supplyid', controller.updateByUserId);

//Update a supply doc by it's supplyid
//router.patch('/:supplyid', controller.updateSupplyByID);

//router.get('/',controller.getAllSupplies) //All supplies without userid

//router.post('/users/:userid', controller.createSupplyByUserId);//7-left for later
module.exports = router;
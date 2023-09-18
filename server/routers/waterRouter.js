const express = require('express');

const waterController = require('../controllers/waterController');
const authentication = require('../middleware/authenticateToken');

const router = express.Router({ mergeParams: true });
router.use(express.json());

const controller = new waterController();




// 2- All water by userid
router.get('/',authentication, controller.getAllWaterByUser); 

//3-Get water doc by waterid & userid
router.get('/:waterid',authentication, controller.getByUserId);

//4- Create water
router.post('/',authentication, controller.createWater);


//5-Delete a water by waterid & UserId
router.delete('/:waterid',authentication, controller.deleteByUserId);

//6- Update a water doc by waterid & userid
router.patch('/:waterid',authentication, controller.updateByUserId);








/*
//Method to get water list based on water id - Get Method (with User id in url)
// router.get('/water/:waterId')
router.get('/:id', controller.getWaterBywaterId);



//Method to update water list based on user id - Get Method (with User id in url)
// router.get('/water/:waterId')
router.patch('/:waterId', controller.updateById);



//Method to delete water list based on water id - Delete Method
// router.delete('/water/:waterId')
router.delete('/:waterId', controller.deleteById);


//Method to get water list based on user id - Get Method (with User id in url)
// router.get('/water/:userId')
//router.post('/users/:userId',Water.createWaterQtyByuserId);


//Method to get water list based on user id - Get Method (with User id in url)
// router.get('/water/:userId')
//router.get('/users/:userId', controller.getAllWaterByuserId);




// Post Method: to create water documents (dependent on User Id) - Post Method
// router.post('/water') + body contents {waterQty , u_id}
router.post('/', controller.createWaterQty);  




//Get Method: to get all added water list - Get Method General (without User id)
// router.get('/water') 
router.get('/',controller.getAllWater); 

*/




module.exports = router;
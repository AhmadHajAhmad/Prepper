const express = require('express');

const waterController = require('../controllers/waterController');

const router = express.Router();
router.use(express.json());

const controller = new waterController();


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






module.exports = router;
const express = require('express');
const FoodController = require('../controllers/foodController');

const router = express.Router();
const controller = new FoodController();

router.get('/', controller.getAllFood);
router.get('/:id', controller.getFoodById);
router.post('/', controller.createFood);
router.delete('/:id', controller.deleteFoodById);
router.patch('/:id', controller.updateFoodByID);
module.exports = router;
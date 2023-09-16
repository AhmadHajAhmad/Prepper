const express = require('express');
const FoodController = require('../controllers/foodController');
const authenticate = require("../middleware/authenticateToken");

const router = express.Router({ mergeParams: true });
const controller = new FoodController();

router.get('/',authenticate, controller.getAllFoodByUser);
router.get('/:foodid',authenticate, controller.getByUserId);
router.post('/',authenticate, controller.createFood);
router.delete('/:foodid',authenticate, controller.deleteByUserId);
router.patch('/:foodid',authenticate, controller.updateByUserID);
module.exports = router;
const express = require('express');
const HouseController = require('../controllers/houseController');

const router = express.Router();
const controller = new HouseController();

router.get('/', controller.getAllHouses);
router.get('/:id', controller.getHouseById);
router.post('/', controller.createHouse);
router.delete('/:id', controller.deleteHouseById);
router.patch('/:id', controller.updateFoodByID);
module.exports = router;
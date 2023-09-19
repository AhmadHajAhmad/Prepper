const express = require('express');
const HouseController = require('../controllers/houseController');
const methodOverride = require('method-override');

const router = express.Router({ mergeParams: true });
const controller = new HouseController();

router.use(methodOverride('X-HTTP-Method-Override'));

router.post('/:id', controller.handleMethodOverride);
router.get('/:id', controller.getHouseById);
router.get('/', controller.getAllHouses);
router.post('/', controller.createHouse);

module.exports = router;

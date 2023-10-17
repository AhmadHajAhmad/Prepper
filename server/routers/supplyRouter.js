const express = require('express');
const SupplyController = require('../controllers/supplyController');
const authenticate = require("../middleware/authenticateToken");

const router = express.Router({ mergeParams: true });
const controller = new SupplyController();

router.get('/',authenticate, controller.getAllSuppliesByUser);
router.get('/:supplyid',authenticate, controller.getByUserId);
router.post('/',authenticate, controller.createSupply);
router.delete('/:supplyid',authenticate, controller.deleteByUserId);
router.patch('/:supplyid',authenticate, controller.updateByUserId);

module.exports = router;
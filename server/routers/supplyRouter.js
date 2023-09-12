const express = require('express');
const SupplyController = require('../controllers/supplyController');

const router = express.Router();
const controller = new SupplyController();

router.get('/', controller.getAllSupplies);
router.get('/:id', controller.getSupplyById);
router.post('/', controller.createSupply);
router.delete('/:id', controller.deleteSupplyById);
router.patch('/:id', controller.updateSupplyByID);
module.exports = router;
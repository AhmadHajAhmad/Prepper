const express = require('express');
const waterController = require('../controllers/waterController');
const authentication = require('../middleware/authenticateToken');
const router = express.Router({ mergeParams: true });
router.use(express.json());
const controller = new waterController();

router.get('/',authentication, controller.getAllWaterByUser); 
router.get('/:waterid',authentication, controller.getByUserId);
router.post('/',authentication, controller.createWater);
router.delete('/:waterid',authentication, controller.deleteByUserId);
router.put('/:waterid',authentication, controller.updateByUserId);

module.exports = router;
const express = require('express');
const CalorieController = require("../controllers/calorieController");
const authentication = require("../middleware/authenticateToken");

const router = express.Router({ mergeParams: true });
const controller = new CalorieController();

router.get("/days",authentication, controller.getDaysOfFood);
router.get("/stored",authentication, controller.getTotalStored);
router.get("/needs",authentication, controller.getTotalIntake);
router.get("/water",authentication, controller.getTotalWater);
module.exports = router;
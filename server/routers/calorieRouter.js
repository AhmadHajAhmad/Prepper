const express = require('express');
const CalorieController = require("../controllers/calorieController");

const router = express.Router({ mergeParams: true });
const controller = new CalorieController();

router.get("/days", controller.getDaysOfFood);
router.get("/stored", controller.getTotalStored);
router.get("/needs", controller.getTotalIntake);
module.exports = router;
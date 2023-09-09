const express = require("express");
const personController = require("../controllers/personController"); // The personController will be added

const router = express.Router();
const controller = new personController();

router.get("/", controller.getAllPersons);
router.get("/:id", controller.getpersonById);
router.post("/", controller.createperson);
router.delete("/:id", controller.deleteById);
router.patch("/:id", controller.updateByID);
module.exports = router;

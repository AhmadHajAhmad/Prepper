const express = require("express");
const personController = require("../controllers/personController");
const authentication = require("../middleware/authenticateToken");

const router = express.Router();
const controller = new personController();

router.get("/", controller.getAllPersons);
router.get("/:id", controller.getpersonById);
router.post("/", authentication, controller.createPerson);
router.delete("/:id", controller.deleteById);
router.patch("/:id", controller.updateByID);
module.exports = router;

const express = require("express");
const personController = require("../controllers/personController");
const authentication = require("../middleware/authenticateToken");

const router = express.Router({ mergeParams: true });
const controller = new personController();

router.get("/", authentication ,controller.getAllPeopleByUser);
router.get("/:personid",authentication ,controller.getByUserId);
router.post("/", authentication, controller.createPerson);
router.delete("/:personid",authentication ,controller.deleteByUserId);
router.patch("/:personid",authentication ,controller.updateByUserId);
module.exports = router;

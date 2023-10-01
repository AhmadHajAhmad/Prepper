const express = require("express");
const AdminController = require("../controllers/adminController");
const adminAuthentication = require("../middleware/authenticateAdmin");

const router = express.Router();
const adminController = new AdminController();

// Endpoints for wiping collections
router.delete("/deletefood", adminAuthentication, adminController.deleteAllFood);
router.delete("/deletesupplies", adminAuthentication, adminController.deleteAllSupplies);
router.delete("/deletewater", adminAuthentication, adminController.deleteAllWater);
router.delete("/deletepersons", adminAuthentication, adminController.deleteAllPersons);

// Enpoints for getting existing collections
router.get("/:id/users", adminAuthentication, adminController.getAllUsers);
router.get("/:id/people", adminAuthentication, adminController.getAllPersons);
router.get("/:id/foods", adminAuthentication, adminController.getAllFood);
router.get("/:id/supplies", adminAuthentication, adminController.getAllSupplies);

// Crud for new admins
router.get("/:id", adminController.getAdminById);
router.delete("/:id", adminController.deleteById);
router.patch("/:id", adminController.updateByID);
router.post("/", adminController.createAdmin);


module.exports = router;

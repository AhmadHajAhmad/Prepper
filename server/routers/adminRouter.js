const express = require("express");
const AdminController = require("../controllers/adminController");
const LoginController = require("../controllers/loginController");
const adminAuthentication = require("../middleware/authenticateAdmin");

const router = express.Router();
const adminController = new AdminController();
const loginController = new LoginController();

router.post("/", adminController.createAdmin);
router.get("/:id", adminController.getAdminById);
router.delete("/:id", adminController.deleteById);
router.patch("/:id", adminController.updateByID);
router.post("/login", loginController.loginAdmin);
router.get("/:id/users", adminAuthentication, adminController.getAllUsers);
router.get("/:id/people", adminAuthentication, adminController.getAllPersons);
router.get("/:id/foods", adminAuthentication, adminController.getAllFood);

module.exports = router;

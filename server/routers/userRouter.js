const express = require('express');
const UserController = require('../controllers/userController');

const router = express.Router();
const controller = new UserController();

router.get('/', controller.getAllUsers);
router.get('/:id', controller.getUserById);
router.post('/', controller.createUser);
router.delete('/:id', controller.deleteById);
router.put('/:id', controller.updateByID);
module.exports = router;
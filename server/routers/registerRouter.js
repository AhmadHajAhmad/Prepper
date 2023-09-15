const express = require('express');
const UserController = require('../controllers/userController');

const router = express.Router();
const controller = new UserController();

router.post('/', controller.createUser);
module.exports = router;
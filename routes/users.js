const express = require('express');
const router = express.Router();

const usersController = require('../controllers/users');
const validator = require('../middleware/validate');

router.get('/', usersController.getAllUsers);
router.get('/:id', validator.saveUser, usersController.getUser);
router.post('/', validator.saveUser, usersController.createUser);
router.put('/:id', usersController.updateUser);
router.delete('/:id', usersController.deleteUser);

module.exports = router;

const express = require('express');
const router = express.Router();

const validator = require('../middleware/validate');
const friendsController = require('../controllers/friends');

router.get('/', friendsController.getAllFriends);
router.get('/:id', friendsController.getFriend);
router.post('/', validator.saveFriend, friendsController.createFriend);
router.put('/:id', validator.saveFriend, friendsController.updateFriend);
router.delete('/:id', friendsController.deleteFriend);

module.exports = router;

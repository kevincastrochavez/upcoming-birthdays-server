const express = require('express');
const router = express.Router();

const friendsController = require('../controllers/friends');

router.get('/', friendsController.getAllFriends);
router.get('/:id', friendsController.getFriend);
router.post('/', friendsController.createFriend);

module.exports = router;

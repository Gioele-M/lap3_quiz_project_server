const express = require('express');
const router = express.Router();

const leaderController = require('../controllers/Leader')

router.get('/', leaderController.leaderboard)
router.patch('/', leaderController.updateScore)
router.post('/new', leaderController.addUserToBoard)
router.delete('/remove', leaderController.removeUser)

module.exports = router;



const express = require('express');
const router = express.Router();

const leaderController = require('../controllers/Leader')

router.get('/leaderboard', userController.leaderboard)
router.patch('/', userController.updateScore)


module.exports = router;



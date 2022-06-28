const express = require('express');
const router = express.Router();
const userController = require('../controllers/Users')

router.get('/', userController.indexUsers)
router.get('/leaderboard', userController.leaderboard)
router.get('/:username', userController.getUser)
router.post('/', userController.createNewUser)
router.patch('/', userController.updateScore)



module.exports = router;





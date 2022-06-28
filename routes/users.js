const express = require('express');
const router = express.Router();
const userController = require('../controllers/Users')

router.get('/', userController.indexUsers)
// router.get('/leaderboard', userController.leaderboard)
// router.get('/:username', userController.getUser)
// router.post('/', userController.createNewUser)
// router.patch('/', userController.updateScore)








// router.get('/', usersController.index)
// router.get('/:id', usersController.show)
// router.post('/', usersController.create)


// router.get('/username/', verifyToken, usersController.getByUsername)
// router.get('/', usersController.getById);



module.exports = router;





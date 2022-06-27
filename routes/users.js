const express = require('express');
const router = express.Router();
const usersController = require('../controllers/Users')

router.get('/', userController.index)
router.get('/:id', userController.show)
router.post('/', userController.create)
// router.get('/username/', verifyToken, usersController.getByUsername)
// router.get('/', usersController.getById);



module.exports = router;





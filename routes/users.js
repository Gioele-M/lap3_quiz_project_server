const express = require('express');
const router = express.Router();
const usersController = require('../controllers/Users')

router.get('/', usersController.index)
router.get('/:id', usersController.show)
router.post('/', usersController.create)
// router.get('/username/', verifyToken, usersController.getByUsername)
// router.get('/', usersController.getById);



module.exports = router;





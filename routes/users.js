const express = require('express');
const router = express.Router();
const userController = require('../controllers/Users')

router.get('/', userController.indexUsers)
router.get('/:username', userController.getUser)


module.exports = router;





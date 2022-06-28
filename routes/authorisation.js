const express = require('express');
const router = express.Router();


const authController = require('../controllers/Authorisation')

router.get('/login', authController.loginUser)
router.post('/register', authController.registerUser)









module.exports = router

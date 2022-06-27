const express = require('express');
const router = express.Router();
const booksController = require('../controllers/books')

router.get('/', userController.index)
router.get('/:id', userController.show)
router.post('/', userController.create)

module.exports = router;

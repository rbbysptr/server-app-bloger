const express = require('express');
const router = express.Router();
const CategoryController = require('../controllers/CategoryController');
const authorization = require('../middleware/authorization');
const authentication = require('../middleware/authentication');


router.get('/', CategoryController.getAllCategories);
router.post('/', authentication,authorization,CategoryController.createCategory);
router.put('/:id', authentication, authorization, CategoryController.updateCategory);

module.exports = router;

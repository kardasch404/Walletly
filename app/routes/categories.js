const express = require('express');
const router = express.Router();
const CategoryController = require('../controllers/CategoryController');
const CategoryService = require('../services/CategoryService');
const CategoryRepository = require('../repositories/CategoryRepository');
const { validateCategoryStore } = require('../http/requests/CategoryStoreRequest');

const categoryRepository = new CategoryRepository();
const categoryService = new CategoryService(categoryRepository);
const categoryController = new CategoryController(categoryService);

router.get('/', async (req, res) => {
    await categoryController.getAllCategoriesFromUser(req, res);
});

router.post('/create', async (req, res) => {
    try {
        validateCategoryStore(req.body);
        await categoryController.createCategory(req, res);
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
});

module.exports = router;
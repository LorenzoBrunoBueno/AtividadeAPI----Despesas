const express = require('express');
const authMiddleware = require('../middlewares/auth');

const router = express.Router();
const CategoryView = require('../views/category');

router.post('/', authMiddleware, CategoryView.create);

router.get('/', authMiddleware, CategoryView.getAll);
router.get('/:id', authMiddleware, CategoryView.getById);

router.put('/:id', authMiddleware, CategoryView.update);

router.delete('/:id', authMiddleware, CategoryView.delete);

module.exports = router;

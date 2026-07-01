const express = require('express');
const authMiddleware = require('../middlewares/auth');
const validateFiltersMiddleware = require('../middlewares/validateFilters');

const router = express.Router();
const ExpenseView = require('../views/expense');

router.post('/', authMiddleware, ExpenseView.create);

router.get('/', authMiddleware, validateFiltersMiddleware, ExpenseView.getAll);
router.get('/:id', authMiddleware, ExpenseView.getById);

router.put('/:id', authMiddleware, ExpenseView.update);

router.delete('/:id', authMiddleware, ExpenseView.delete);

module.exports = router;

const express = require('express');
const authMiddleware = require('../middlewares/auth');

const router = express.Router();
const DashboardView = require('../views/dashboard');

router.get('/total-expenses', authMiddleware, DashboardView.totalExpenses);
router.get('/expenses-count', authMiddleware, DashboardView.countExpenses);
router.get('/expenses-by-category', authMiddleware, DashboardView.byCategoryExpenses);

module.exports = router;

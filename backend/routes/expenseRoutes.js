import express from 'express';
import { addExpense, getGroupExpenses, getGroupSettlements } from '../controllers/expenseController';
import { authMiddleware } from '../middleware/auth';

const router = express.Router();

router.post('/', authMiddleware, addExpense)
router.get('/:groupId', authMiddleware, getGroupExpenses);
router.get('/settlements/:groupId', authMiddleware, getGroupSettlements);

export default router;
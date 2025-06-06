import { Router } from 'express';
import { getAllExpenses, createExpense, updateExpense, deleteExpense, getTotalExpenses } from '../controllers/expenseController';

const router = Router();

router.get('/', getAllExpenses);
router.post('/', createExpense);
router.put('/:id', updateExpense);
router.delete('/:id', deleteExpense);
router.get('/total', getTotalExpenses);

export default router;

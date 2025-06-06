import { Request, Response } from 'express';
import { Expense } from '../models/Expense';

export const getAllExpenses = async (_req: Request, res: Response) => {
  const expenses = await Expense.find().sort({ date: -1 });
  res.json(expenses);
};

export const createExpense = async (req: Request, res: Response) => {
  const { description, amount, date } = req.body;
  if (!description || amount < 0 || !date) {
    return res.status(400).json({ error: 'Dados inválidos' });
  }
  const expense = new Expense({ description, amount, date });
  await expense.save();
  res.status(201).json(expense);
};

export const updateExpense = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { description, amount, date } = req.body;
  const updated = await Expense.findByIdAndUpdate(id, { description, amount, date }, { new: true });
  res.json(updated);
};

export const deleteExpense = async (req: Request, res: Response) => {
  const { id } = req.params;
  await Expense.findByIdAndDelete(id);
  res.status(204).send();
};

export const getTotalExpenses = async (_req: Request, res: Response) => {
  const total = await Expense.aggregate([
    { $group: { _id: null, totalAmount: { $sum: "$amount" } } }
  ]);
  const totalAmount = total.length > 0 ? total[0].totalAmount : 0;
  res.json(totalAmount);
};

import { Request, Response, NextFunction } from "express";
import { ExpenseService } from "../services/expense.service";

export const createExpense = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = (req as any).user.id;
    const expense = await ExpenseService.createExpense(req.body, userId);
    res.status(201).json({ message: "Expense created", data: expense, success: true });
  } catch (error) {
    next(error);
  }
};

export const getExpensesByGroup = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { groupId } = req.params;
    const expenses = await ExpenseService.getExpensesByGroup(groupId);
    res.status(200).json({ message: "Expenses fetched", data: expenses, success: true });
  } catch (error) {
    next(error);
  }
};

export const getExpenseById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { expenseId } = req.params;
    const expense = await ExpenseService.getExpenseById(expenseId);
    res.status(200).json({ message: "Expense fetched", data: expense, success: true });
  } catch (error) {
    next(error);
  }
};

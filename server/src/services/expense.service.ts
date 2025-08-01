// services/expense.service.ts
import { z } from "zod";
import { ExpenseRepository } from "../repositories/expense.repository";
import { BadRequestError } from "../utils/errors/BadRequestError";
import { NotFoundError } from "../utils/errors/NotFoundError";
import { AppError } from "../utils/AppError";

const expenseSchema = z.object({
  groupId: z.string().uuid(),
  amount: z.number().positive("Amount must be greater than 0"),
  description: z.string().min(1, "Description is required"),
  paidBy: z.string().uuid("Invalid payer ID"),
  splitType: z.enum(["equal", "custom"]),
  splitBetween: z.array(z.string().uuid()).min(1, "At least one participant required"),
  customSplits: z
    .array(z.object({ userId: z.string().uuid(), amount: z.number().positive() }))
    .optional(),
});

export const ExpenseService = {
  createExpense: async (data: any, creatorId: string) => {
    const parsed = expenseSchema.safeParse(data);
    if (!parsed.success) {
      const msg = parsed.error.errors.map((e) => e.message).join(", ");
      throw new BadRequestError(msg);
    }

    try {
      const { groupId, amount, description, paidBy, splitType, splitBetween, customSplits } =
        parsed.data;

      // Optional: Verify group existence, user group membership etc. via GroupService
      return await ExpenseRepository.createExpense({
        groupId,
        amount,
        description,
        paidBy,
        createdBy: creatorId,
        splitType,
        splitBetween,
        customSplits,
      });
    } catch (error: any) {
      console.error("Create Expense Error:", error);
      if (error instanceof AppError) throw error;
      throw new AppError("Unexpected error while creating expense", 500);
    }
  },

  getExpensesByGroup: async (groupId: string) => {
    if (!groupId) throw new BadRequestError("Group ID is required");
    try {
      const expenses = await ExpenseRepository.getExpensesByGroup(groupId);
      return expenses;
    } catch (error: any) {
      console.error("Get Expenses Error:", error);
      if (error instanceof AppError) throw error;
      throw new AppError("Unexpected error while fetching expenses", 500);
    }
  },

  getExpenseById: async (expenseId: string) => {
    if (!expenseId) throw new BadRequestError("Expense ID is required");
    try {
      const expense = await ExpenseRepository.getExpenseById(expenseId);
      if (!expense) throw new NotFoundError("Expense");
      return expense;
    } catch (error: any) {
      console.error("Get Expense By ID Error:", error);
      if (error instanceof AppError) throw error;
      throw new AppError("Unexpected error while fetching expense", 500);
    }
  },
};

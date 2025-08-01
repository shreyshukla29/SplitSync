// repositories/expense.repository.ts
import prisma from "../config/prisma.client";
import { Prisma } from "@prisma/client";

export const ExpenseRepository = {
  createExpense: async (data: {
    groupId: string;
    amount: number;
    description: string;
    paidBy: string;
    createdBy: string;
    splitType: string;
    splitBetween: string[];
    customSplits?: { userId: string; amount: number }[];
  }) => {
    return await prisma.expense.create({
      data: {
        groupId: data.groupId,
        amount: data.amount,
        description: data.description,
        paidBy: data.paidBy,
        createdBy: data.createdBy,
        splitType: data.splitType,
        splitBetween: {
          createMany: {
            data:
              data.splitType === "equal"
                ? data.splitBetween.map((userId) => ({ userId }))
                : [],
          },
        },
        customSplits: data.splitType === "custom"
          ? {
              createMany: {
                data: data.customSplits ?? [],
              },
            }
          : undefined,
      },
      include: {
        splitBetween: true,
        customSplits: true,
      },
    });
  },

  getExpensesByGroup: async (groupId: string) => {
    return await prisma.expense.findMany({
      where: { groupId },
      include: {
        paidByUser: true,
        splitBetween: true,
        customSplits: true,
      },
      orderBy: { createdAt: "desc" },
    });
  },

  getExpenseById: async (expenseId: string) => {
    return await prisma.expense.findUnique({
      where: { id: expenseId },
      include: {
        paidByUser: true,
        splitBetween: true,
        customSplits: true,
      },
    });
  },
};

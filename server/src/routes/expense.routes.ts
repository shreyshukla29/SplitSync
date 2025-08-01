// routes/expense.route.ts
import { Router } from "express";
import {
  createExpense,
  getExpensesByGroup,
  getExpenseById,
} from "../controllers/expense.controller";
import { authenticate } from "../middlewares/auth.middleware";

const router = Router();

router.post("/", authenticate, createExpense);
router.get("/group/:groupId", authenticate, getExpensesByGroup);
router.get("/:expenseId", authenticate, getExpenseById);

export default router;

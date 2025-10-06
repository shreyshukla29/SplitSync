import { useAppDispatch, useAppSelector } from '../store';
import {
  fetchExpenses,
  fetchExpense,
  createExpense,
  updateExpense,
  deleteExpense,
  fetchExpenseNote,
  createExpenseNote,
  updateExpenseNote,
  fetchExpenseComments,
  createExpenseComment,
  deleteExpenseComment,
  clearExpenses,
} from '../store/slices/expenseSlice';
import { CreateExpenseData } from '../services/expenseService';

export const useExpenses = () => {
  const dispatch = useAppDispatch();
  const { 
    expenses, 
    currentExpense, 
    notes, 
    comments, 
    pagination, 
    isLoading, 
    error 
  } = useAppSelector(state => state.expenses);

  const loadExpenses = (groupId?: string, page = 1, limit = 20) => {
    dispatch(fetchExpenses({ groupId, page, limit }));
  };

  const loadExpense = (id: string) => {
    dispatch(fetchExpense(id));
  };

  const addExpense = async (data: CreateExpenseData) => {
    return dispatch(createExpense(data));
  };

  const editExpense = async (id: string, data: Partial<CreateExpenseData>) => {
    return dispatch(updateExpense({ id, data }));
  };

  const removeExpense = async (id: string) => {
    return dispatch(deleteExpense(id));
  };

  // Notes
  const loadExpenseNote = (expenseId: string) => {
    dispatch(fetchExpenseNote(expenseId));
  };

  const addExpenseNote = async (expenseId: string, content: string) => {
    return dispatch(createExpenseNote({ expenseId, content }));
  };

  const editExpenseNote = async (expenseId: string, content: string) => {
    return dispatch(updateExpenseNote({ expenseId, content }));
  };

  // Comments
  const loadExpenseComments = (expenseId: string) => {
    dispatch(fetchExpenseComments(expenseId));
  };

  const addExpenseComment = async (expenseId: string, message: string) => {
    return dispatch(createExpenseComment({ expenseId, message }));
  };

  const removeExpenseComment = async (expenseId: string, commentId: string) => {
    return dispatch(deleteExpenseComment({ expenseId, commentId }));
  };

  const clearAllExpenses = () => {
    dispatch(clearExpenses());
  };

  return {
    expenses,
    currentExpense,
    notes,
    comments,
    pagination,
    isLoading,
    error,
    loadExpenses,
    loadExpense,
    addExpense,
    editExpense,
    removeExpense,
    loadExpenseNote,
    addExpenseNote,
    editExpenseNote,
    loadExpenseComments,
    addExpenseComment,
    removeExpenseComment,
    clearAllExpenses,
  };
};
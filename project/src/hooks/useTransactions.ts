import { useAppDispatch, useAppSelector } from '../store';
import {
  fetchTransactions,
  fetchTransaction,
  createPayment,
  settleBalance,
  markPaymentComplete,
  cancelTransaction,
  setFilters,
  clearTransactions,
} from '../store/slices/transactionSlice';
import { CreatePaymentData, TransactionFilters } from '../services/transactionService';

export const useTransactions = () => {
  const dispatch = useAppDispatch();
  const { 
    transactions, 
    currentTransaction, 
    pagination, 
    filters, 
    isLoading, 
    error 
  } = useAppSelector(state => state.transactions);

  const loadTransactions = (filters: TransactionFilters = {}, page = 1, limit = 20) => {
    dispatch(fetchTransactions({ filters, page, limit }));
  };

  const loadTransaction = (id: string) => {
    dispatch(fetchTransaction(id));
  };

  const makePayment = async (data: CreatePaymentData) => {
    return dispatch(createPayment(data));
  };

  const settleUserBalance = async (userId: string, amount: number, groupId?: string) => {
    return dispatch(settleBalance({ userId, amount, groupId }));
  };

  const markComplete = async (transactionId: string) => {
    return dispatch(markPaymentComplete(transactionId));
  };

  const cancelPayment = async (transactionId: string) => {
    return dispatch(cancelTransaction(transactionId));
  };

  const updateFilters = (newFilters: TransactionFilters) => {
    dispatch(setFilters(newFilters));
  };

  const clearAllTransactions = () => {
    dispatch(clearTransactions());
  };

  return {
    transactions,
    currentTransaction,
    pagination,
    filters,
    isLoading,
    error,
    loadTransactions,
    loadTransaction,
    makePayment,
    settleUserBalance,
    markComplete,
    cancelPayment,
    updateFilters,
    clearAllTransactions,
  };
};
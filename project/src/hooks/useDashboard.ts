import { useEffect, useMemo } from 'react';
import { useGroups } from './useGroups';
import { useAppDispatch, useAppSelector } from '../store';
import { openModal, closeModal } from '../store/slices/uiSlice';
import { BalanceType, ModalType } from '../types/enums';

export const useDashboard = () => {
  const dispatch = useAppDispatch();
  const { groups, userBalances, isLoading, loadGroups, loadUserBalances } = useGroups();
  const { modals } = useAppSelector(state => state.ui);

  // Load data on component mount
  useEffect(() => {
    loadGroups();
    loadUserBalances();
  }, [loadGroups, loadUserBalances]);

 
  const { hasGroups, totalOwed, totalOwe } = useMemo(() => ({
    hasGroups: groups.length > 0,
    totalOwed: userBalances
      .filter(b => b.type === BalanceType.OWED)
      .reduce((sum, b) => sum + b.amount, 0),
    totalOwe: userBalances
      .filter(b => b.type === BalanceType.OWE)
      .reduce((sum, b) => sum + Math.abs(b.amount), 0),
  }), [groups.length, userBalances]);

  const handlers = useMemo(() => ({
    openAddExpense: () => dispatch(openModal(ModalType.ADD_EXPENSE)),
    closeAddExpense: () => dispatch(closeModal(ModalType.ADD_EXPENSE)),
    settleGroup: (groupId: string, amount: number) => {
      console.log('Settling group:', groupId, 'amount:', amount);
    },
  }), [dispatch]);

  return {
    groups,
    userBalances,
    totalOwed,
    totalOwe,
    hasGroups,
    isLoading,
    modals,
    ...handlers,
  };
};
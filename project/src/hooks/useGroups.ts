import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../store';
import {
  fetchGroups,
  fetchGroup,
  createGroup,
  updateGroup,
  deleteGroup,
  addGroupMember,
  removeGroupMember,
  fetchGroupBalances,
  fetchUserBalances,
  clearCurrentGroup,
} from '../store/slices/groupSlice';

export const useGroups = () => {
  const dispatch = useAppDispatch();
  const { groups, currentGroup, balances, userBalances, isLoading, error } = useAppSelector(state => state.groups);

  const loadGroups = () => {
    dispatch(fetchGroups());
  };

  const loadGroup = (id: string) => {
    dispatch(fetchGroup(id));
  };

  const addGroup = async (data: { name: string; description?: string }) => {
    return dispatch(createGroup(data));
  };

  const editGroup = async (id: string, data: { name?: string; description?: string }) => {
    return dispatch(updateGroup({ id, data }));
  };

  const removeGroup = async (id: string) => {
    return dispatch(deleteGroup(id));
  };

  const addMember = async (groupId: string, email: string) => {
    return dispatch(addGroupMember({ groupId, email }));
  };

  const removeMember = async (groupId: string, userId: string) => {
    return dispatch(removeGroupMember({ groupId, userId }));
  };

  const loadGroupBalances = (groupId: string) => {
    dispatch(fetchGroupBalances(groupId));
  };

  const loadUserBalances = () => {
    dispatch(fetchUserBalances());
  };

  const clearGroup = () => {
    dispatch(clearCurrentGroup());
  };

  return {
    groups,
    currentGroup,
    balances,
    userBalances,
    isLoading,
    error,
    loadGroups,
    loadGroup,
    addGroup,
    editGroup,
    removeGroup,
    addMember,
    removeMember,
    loadGroupBalances,
    loadUserBalances,
    clearGroup,
  };
};
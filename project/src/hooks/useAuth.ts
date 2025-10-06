import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../store';
import { getCurrentUser, loginUser, signupUser, logoutUser, updateProfile } from '../store/slices/authSlice';
import { LoginCredentials, SignupData, User } from '../types';

export const useAuth = () => {
  const dispatch = useAppDispatch();
  const { user, token, isAuthenticated, isLoading, error } = useAppSelector(state => state.auth);

  useEffect(() => {
    if (token && !user) {
      dispatch(getCurrentUser());
    }
  }, [dispatch, token, user]);

  const login = async (credentials: LoginCredentials) => {
    return dispatch(loginUser(credentials));
  };

  const signup = async (data: SignupData) => {
    return dispatch(signupUser(data));
  };

  const logout = async () => {
    return dispatch(logoutUser());
  };

  const updateUserProfile = async (data: Partial<User>) => {
    return dispatch(updateProfile(data));
  };

  return {
    user,
    token,
    isAuthenticated,
    isLoading,
    error,
    login,
    signup,
    logout,
    updateProfile: updateUserProfile,
  };
};
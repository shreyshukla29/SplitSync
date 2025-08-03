import { createAsyncThunk } from '@reduxjs/toolkit';
import { loginApi, logoutApi, signupApi } from './authApi';
import { LoginPayload, SignupPayload, User } from './authTypes';

export const loginThunk = createAsyncThunk<User, LoginPayload, { rejectValue: string }>(
  'auth/login',
  async (credentials, { rejectWithValue }) => {
    try {
      return await loginApi(credentials);
    } catch (err: unknown) {
      return rejectWithValue(err.response?.data?.message || 'Login failed');
    }
  }
);

export const signupThunk = createAsyncThunk<User, SignupPayload, { rejectValue: string }>(
  'auth/signup',
  async (credentials, { rejectWithValue }) => {
    try {
      return await signupApi(credentials);
    } catch (err: unknown) {
      return rejectWithValue(err.response?.data?.message || 'Signup failed');
    }
  }
);

export const logoutThunk = createAsyncThunk<void, void, { rejectValue: string }>(
  'auth/logout',
  async (_, { rejectWithValue }) => {
    try {
      await logoutApi();
    } catch (err: unknown) {
      return rejectWithValue(err.response?.data?.message || 'Logout failed');
    }
  }
);

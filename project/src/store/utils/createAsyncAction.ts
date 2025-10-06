import { createAsyncThunk } from '@reduxjs/toolkit';

export const createAsyncAction = <T, U>(
  type: string,
  asyncFn: (arg: T) => Promise<{ success: boolean; data?: U; error?: string }>
) =>
  createAsyncThunk(type, async (arg: T, { rejectWithValue }) => {
    try {
      const response = await asyncFn(arg);
      if (response.success) return response.data;
      throw new Error(response.error || 'Operation failed');
    } catch (err: unknwon) {
      return rejectWithValue(err.message);
    }
  });

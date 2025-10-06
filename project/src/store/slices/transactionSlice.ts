import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Transaction, PaginatedResponse } from '../../types';
import { transactionService, CreatePaymentData, TransactionFilters } from '../../services/transactionService';

interface TransactionState {
  transactions: Transaction[];
  currentTransaction: Transaction | null;
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
  filters: TransactionFilters;
  isLoading: boolean;
  error: string | null;
}

const initialState: TransactionState = {
  transactions: [],
  currentTransaction: null,
  pagination: {
    total: 0,
    page: 1,
    limit: 20,
    totalPages: 0,
  },
  filters: {},
  isLoading: false,
  error: null,
};

// Async thunks
export const fetchTransactions = createAsyncThunk(
  'transactions/fetchTransactions',
  async ({ filters = {}, page = 1, limit = 20 }: { 
    filters?: TransactionFilters; 
    page?: number; 
    limit?: number; 
  }, { rejectWithValue }) => {
    try {
      const response = await transactionService.getTransactions(filters, page, limit);
      if (response.success) {
        return response.data;
      }
      throw new Error(response.error || 'Failed to fetch transactions');
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchTransaction = createAsyncThunk(
  'transactions/fetchTransaction',
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await transactionService.getTransaction(id);
      if (response.success) {
        return response.data;
      }
      throw new Error(response.error || 'Failed to fetch transaction');
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const createPayment = createAsyncThunk(
  'transactions/createPayment',
  async (data: CreatePaymentData, { rejectWithValue }) => {
    try {
      const response = await transactionService.createPayment(data);
      if (response.success) {
        return response.data;
      }
      throw new Error(response.error || 'Failed to create payment');
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const settleBalance = createAsyncThunk(
  'transactions/settleBalance',
  async ({ userId, amount, groupId }: { userId: string; amount: number; groupId?: string }, { rejectWithValue }) => {
    try {
      const response = await transactionService.settleBalance(userId, amount, groupId);
      if (response.success) {
        return response.data;
      }
      throw new Error(response.error || 'Failed to settle balance');
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const markPaymentComplete = createAsyncThunk(
  'transactions/markComplete',
  async (transactionId: string, { rejectWithValue }) => {
    try {
      const response = await transactionService.markPaymentComplete(transactionId);
      if (response.success) {
        return response.data;
      }
      throw new Error(response.error || 'Failed to mark payment complete');
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const cancelTransaction = createAsyncThunk(
  'transactions/cancel',
  async (transactionId: string, { rejectWithValue }) => {
    try {
      const response = await transactionService.cancelTransaction(transactionId);
      if (response.success) {
        return response.data;
      }
      throw new Error(response.error || 'Failed to cancel transaction');
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

const transactionSlice = createSlice({
  name: 'transactions',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    setFilters: (state, action) => {
      state.filters = action.payload;
    },
    clearTransactions: (state) => {
      state.transactions = [];
      state.pagination = initialState.pagination;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch transactions
      .addCase(fetchTransactions.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchTransactions.fulfilled, (state, action) => {
        state.isLoading = false;
        const { data, total, page, limit, totalPages } = action.payload;
        
        if (page === 1) {
          state.transactions = data;
        } else {
          state.transactions.push(...data);
        }
        
        state.pagination = { total, page, limit, totalPages };
      })
      .addCase(fetchTransactions.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // Fetch single transaction
      .addCase(fetchTransaction.fulfilled, (state, action) => {
        state.currentTransaction = action.payload;
      })
      // Create payment
      .addCase(createPayment.fulfilled, (state, action) => {
        state.transactions.unshift(action.payload);
      })
      // Settle balance
      .addCase(settleBalance.fulfilled, (state, action) => {
        state.transactions.unshift(action.payload);
      })
      // Mark payment complete
      .addCase(markPaymentComplete.fulfilled, (state, action) => {
        const index = state.transactions.findIndex(t => t.id === action.payload.id);
        if (index !== -1) {
          state.transactions[index] = action.payload;
        }
        if (state.currentTransaction?.id === action.payload.id) {
          state.currentTransaction = action.payload;
        }
      })
      // Cancel transaction
      .addCase(cancelTransaction.fulfilled, (state, action) => {
        const index = state.transactions.findIndex(t => t.id === action.payload.id);
        if (index !== -1) {
          state.transactions[index] = action.payload;
        }
        if (state.currentTransaction?.id === action.payload.id) {
          state.currentTransaction = action.payload;
        }
      });
  },
});

export const { clearError, setFilters, clearTransactions } = transactionSlice.actions;
export default transactionSlice.reducer;
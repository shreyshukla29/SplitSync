import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Expense, ExpenseNote, ExpenseComment, PaginatedResponse } from '../../types';
import { expenseService, CreateExpenseData } from '../../services/expenseService';

interface ExpenseState {
  expenses: Expense[];
  currentExpense: Expense | null;
  notes: { [expenseId: string]: ExpenseNote };
  comments: { [expenseId: string]: ExpenseComment[] };
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
  isLoading: boolean;
  error: string | null;
}

const initialState: ExpenseState = {
  expenses: [],
  currentExpense: null,
  notes: {},
  comments: {},
  pagination: {
    total: 0,
    page: 1,
    limit: 20,
    totalPages: 0,
  },
  isLoading: false,
  error: null,
};

// Async thunks
export const fetchExpenses = createAsyncThunk(
  'expenses/fetchExpenses',
  async ({ groupId, page = 1, limit = 20 }: { groupId?: string; page?: number; limit?: number }, { rejectWithValue }) => {
    try {
      const response = await expenseService.getExpenses(groupId, page, limit);
      if (response.success) {
        return response.data;
      }
      throw new Error(response.error || 'Failed to fetch expenses');
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchExpense = createAsyncThunk(
  'expenses/fetchExpense',
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await expenseService.getExpense(id);
      if (response.success) {
        return response.data;
      }
      throw new Error(response.error || 'Failed to fetch expense');
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const createExpense = createAsyncThunk(
  'expenses/createExpense',
  async (data: CreateExpenseData, { rejectWithValue }) => {
    try {
      const response = await expenseService.createExpense(data);
      if (response.success) {
        return response.data;
      }
      throw new Error(response.error || 'Failed to create expense');
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateExpense = createAsyncThunk(
  'expenses/updateExpense',
  async ({ id, data }: { id: string; data: Partial<CreateExpenseData> }, { rejectWithValue }) => {
    try {
      const response = await expenseService.updateExpense(id, data);
      if (response.success) {
        return response.data;
      }
      throw new Error(response.error || 'Failed to update expense');
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteExpense = createAsyncThunk(
  'expenses/deleteExpense',
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await expenseService.deleteExpense(id);
      if (response.success) {
        return id;
      }
      throw new Error(response.error || 'Failed to delete expense');
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

// Note thunks
export const fetchExpenseNote = createAsyncThunk(
  'expenses/fetchNote',
  async (expenseId: string, { rejectWithValue }) => {
    try {
      const response = await expenseService.getExpenseNote(expenseId);
      if (response.success) {
        return { expenseId, note: response.data };
      }
      throw new Error(response.error || 'Failed to fetch note');
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const createExpenseNote = createAsyncThunk(
  'expenses/createNote',
  async ({ expenseId, content }: { expenseId: string; content: string }, { rejectWithValue }) => {
    try {
      const response = await expenseService.createExpenseNote(expenseId, content);
      if (response.success) {
        return { expenseId, note: response.data };
      }
      throw new Error(response.error || 'Failed to create note');
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateExpenseNote = createAsyncThunk(
  'expenses/updateNote',
  async ({ expenseId, content }: { expenseId: string; content: string }, { rejectWithValue }) => {
    try {
      const response = await expenseService.updateExpenseNote(expenseId, content);
      if (response.success) {
        return { expenseId, note: response.data };
      }
      throw new Error(response.error || 'Failed to update note');
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

// Comment thunks
export const fetchExpenseComments = createAsyncThunk(
  'expenses/fetchComments',
  async (expenseId: string, { rejectWithValue }) => {
    try {
      const response = await expenseService.getExpenseComments(expenseId);
      if (response.success) {
        return { expenseId, comments: response.data };
      }
      throw new Error(response.error || 'Failed to fetch comments');
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const createExpenseComment = createAsyncThunk(
  'expenses/createComment',
  async ({ expenseId, message }: { expenseId: string; message: string }, { rejectWithValue }) => {
    try {
      const response = await expenseService.createExpenseComment(expenseId, message);
      if (response.success) {
        return { expenseId, comment: response.data };
      }
      throw new Error(response.error || 'Failed to create comment');
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteExpenseComment = createAsyncThunk(
  'expenses/deleteComment',
  async ({ expenseId, commentId }: { expenseId: string; commentId: string }, { rejectWithValue }) => {
    try {
      const response = await expenseService.deleteExpenseComment(commentId);
      if (response.success) {
        return { expenseId, commentId };
      }
      throw new Error(response.error || 'Failed to delete comment');
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

const expenseSlice = createSlice({
  name: 'expenses',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    setCurrentExpense: (state, action: PayloadAction<Expense | null>) => {
      state.currentExpense = action.payload;
    },
    clearExpenses: (state) => {
      state.expenses = [];
      state.pagination = initialState.pagination;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch expenses
      .addCase(fetchExpenses.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchExpenses.fulfilled, (state, action) => {
        state.isLoading = false;
        const { data, total, page, limit, totalPages } = action.payload;
        
        if (page === 1) {
          state.expenses = data;
        } else {
          state.expenses.push(...data);
        }
        
        state.pagination = { total, page, limit, totalPages };
      })
      .addCase(fetchExpenses.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // Fetch single expense
      .addCase(fetchExpense.fulfilled, (state, action) => {
        state.currentExpense = action.payload;
      })
      // Create expense
      .addCase(createExpense.fulfilled, (state, action) => {
        state.expenses.unshift(action.payload);
      })
      // Update expense
      .addCase(updateExpense.fulfilled, (state, action) => {
        const index = state.expenses.findIndex(e => e.id === action.payload.id);
        if (index !== -1) {
          state.expenses[index] = action.payload;
        }
        if (state.currentExpense?.id === action.payload.id) {
          state.currentExpense = action.payload;
        }
      })
      // Delete expense
      .addCase(deleteExpense.fulfilled, (state, action) => {
        state.expenses = state.expenses.filter(e => e.id !== action.payload);
        if (state.currentExpense?.id === action.payload) {
          state.currentExpense = null;
        }
      })
      // Notes
      .addCase(fetchExpenseNote.fulfilled, (state, action) => {
        const { expenseId, note } = action.payload;
        if (note) {
          state.notes[expenseId] = note;
        }
      })
      .addCase(createExpenseNote.fulfilled, (state, action) => {
        const { expenseId, note } = action.payload;
        state.notes[expenseId] = note;
      })
      .addCase(updateExpenseNote.fulfilled, (state, action) => {
        const { expenseId, note } = action.payload;
        state.notes[expenseId] = note;
      })
      // Comments
      .addCase(fetchExpenseComments.fulfilled, (state, action) => {
        const { expenseId, comments } = action.payload;
        state.comments[expenseId] = comments;
      })
      .addCase(createExpenseComment.fulfilled, (state, action) => {
        const { expenseId, comment } = action.payload;
        if (!state.comments[expenseId]) {
          state.comments[expenseId] = [];
        }
        state.comments[expenseId].push(comment);
      })
      .addCase(deleteExpenseComment.fulfilled, (state, action) => {
        const { expenseId, commentId } = action.payload;
        if (state.comments[expenseId]) {
          state.comments[expenseId] = state.comments[expenseId].filter(c => c.id !== commentId);
        }
      });
  },
});

export const { clearError, setCurrentExpense, clearExpenses } = expenseSlice.actions;
export default expenseSlice.reducer;
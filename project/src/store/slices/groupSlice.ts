import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Group, Balance } from '../../types';
import { groupService } from '../../services/groupService';

interface GroupState {
  groups: Group[];
  currentGroup: Group | null;
  balances: Balance[];
  userBalances: Balance[];
  isLoading: boolean;
  error: string | null;
}

const initialState: GroupState = {
  groups: [],
  currentGroup: null,
  balances: [],
  userBalances: [],
  isLoading: false,
  error: null,
};

// Async thunks
export const fetchGroups = createAsyncThunk(
  'groups/fetchGroups',
  async (_, { rejectWithValue }) => {
    try {
      const response = await groupService.getGroups();
      if (response.success) {
        return response.data;
      }
      throw new Error(response.error || 'Failed to fetch groups');
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchGroup = createAsyncThunk(
  'groups/fetchGroup',
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await groupService.getGroup(id);
      if (response.success) {
        return response.data;
      }
      throw new Error(response.error || 'Failed to fetch group');
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const createGroup = createAsyncThunk(
  'groups/createGroup',
  async (data: { name: string; description?: string }, { rejectWithValue }) => {
    try {
      const response = await groupService.createGroup(data);
      if (response.success) {
        return response.data;
      }
      throw new Error(response.error || 'Failed to create group');
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateGroup = createAsyncThunk(
  'groups/updateGroup',
  async ({ id, data }: { id: string; data: Partial<Group> }, { rejectWithValue }) => {
    try {
      const response = await groupService.updateGroup(id, data);
      if (response.success) {
        return response.data;
      }
      throw new Error(response.error || 'Failed to update group');
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteGroup = createAsyncThunk(
  'groups/deleteGroup',
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await groupService.deleteGroup(id);
      if (response.success) {
        return id;
      }
      throw new Error(response.error || 'Failed to delete group');
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const addGroupMember = createAsyncThunk(
  'groups/addMember',
  async ({ groupId, email }: { groupId: string; email: string }, { rejectWithValue }) => {
    try {
      const response = await groupService.addMember(groupId, email);
      if (response.success) {
        return response.data;
      }
      throw new Error(response.error || 'Failed to add member');
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const removeGroupMember = createAsyncThunk(
  'groups/removeMember',
  async ({ groupId, userId }: { groupId: string; userId: string }, { rejectWithValue }) => {
    try {
      const response = await groupService.removeMember(groupId, userId);
      if (response.success) {
        return response.data;
      }
      throw new Error(response.error || 'Failed to remove member');
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchGroupBalances = createAsyncThunk(
  'groups/fetchGroupBalances',
  async (groupId: string, { rejectWithValue }) => {
    try {
      const response = await groupService.getGroupBalances(groupId);
      if (response.success) {
        return response.data;
      }
      throw new Error(response.error || 'Failed to fetch balances');
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchUserBalances = createAsyncThunk(
  'groups/fetchUserBalances',
  async (_, { rejectWithValue }) => {
    try {
      const response = await groupService.getUserBalances();
      if (response.success) {
        return response.data;
      }
      throw new Error(response.error || 'Failed to fetch user balances');
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

const groupSlice = createSlice({
  name: 'groups',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    setCurrentGroup: (state, action: PayloadAction<Group | null>) => {
      state.currentGroup = action.payload;
    },
    clearCurrentGroup: (state) => {
      state.currentGroup = null;
      state.balances = [];
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch groups
      .addCase(fetchGroups.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchGroups.fulfilled, (state, action) => {
        state.isLoading = false;
        state.groups = action.payload;
      })
      .addCase(fetchGroups.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // Fetch single group
      .addCase(fetchGroup.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchGroup.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentGroup = action.payload;
      })
      .addCase(fetchGroup.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // Create group
      .addCase(createGroup.fulfilled, (state, action) => {
        state.groups.push(action.payload);
      })
      // Update group
      .addCase(updateGroup.fulfilled, (state, action) => {
        const index = state.groups.findIndex(g => g.id === action.payload.id);
        if (index !== -1) {
          state.groups[index] = action.payload;
        }
        if (state.currentGroup?.id === action.payload.id) {
          state.currentGroup = action.payload;
        }
      })
      // Delete group
      .addCase(deleteGroup.fulfilled, (state, action) => {
        state.groups = state.groups.filter(g => g.id !== action.payload);
        if (state.currentGroup?.id === action.payload) {
          state.currentGroup = null;
        }
      })
      // Add/Remove members
      .addCase(addGroupMember.fulfilled, (state, action) => {
        const index = state.groups.findIndex(g => g.id === action.payload.id);
        if (index !== -1) {
          state.groups[index] = action.payload;
        }
        if (state.currentGroup?.id === action.payload.id) {
          state.currentGroup = action.payload;
        }
      })
      .addCase(removeGroupMember.fulfilled, (state, action) => {
        const index = state.groups.findIndex(g => g.id === action.payload.id);
        if (index !== -1) {
          state.groups[index] = action.payload;
        }
        if (state.currentGroup?.id === action.payload.id) {
          state.currentGroup = action.payload;
        }
      })
      // Fetch balances
      .addCase(fetchGroupBalances.fulfilled, (state, action) => {
        state.balances = action.payload;
      })
      .addCase(fetchUserBalances.fulfilled, (state, action) => {
        state.userBalances = action.payload;
      });
  },
});

export const { clearError, setCurrentGroup, clearCurrentGroup } = groupSlice.actions;
export default groupSlice.reducer;
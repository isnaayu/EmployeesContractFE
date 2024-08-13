import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {  createBranch, deleteBranchById, getAllBranch } from '../../services/BranchService';
import { BranchResponse } from '../../types/branches';

interface BranchState {
  branches: BranchResponse[];
  loading: boolean;
  error: string | null;
}

const initialState: BranchState = {
  branches: [],
  loading: false,
  error: null,
};

export const fetchBranches = createAsyncThunk(
  'branch/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const response = await getAllBranch();
      return response.data.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to fetch branches',
      );
    }
  },
);

export const deleteBranch = createAsyncThunk(
    'Branch/delete',
    async (id: number, { rejectWithValue }) => {
        try {
            const response = await deleteBranchById(id);
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Failed to delete detail employee');
        }
    }
);

export const postBranches = createAsyncThunk(
    'branch/importdata-branch',
    async ({ file }: { file: File }, { rejectWithValue }) => {
        try {
            const response = await createBranch(file);
            return response.data.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Failed to import detail employee');
        }
    }
);

const BranchSlice = createSlice({
  name: 'branch',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
     .addCase(deleteBranch.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteBranch.fulfilled, (state, action) => {
        state.branches = state.branches.filter((branch) => branch.branchId!== action.payload);
      })
      .addCase(deleteBranch.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
     .addCase(postBranches.pending, (state) => {
        state.loading = true;
      })
      .addCase(postBranches.fulfilled, (state, action) => {
        state.loading = false;
        state.branches = [...state.branches, action.payload];
      })
      .addCase(postBranches.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchBranches.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchBranches.fulfilled, (state, action) => {
        state.loading = false;
        state.branches = action.payload;
      })
      .addCase(fetchBranches.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default BranchSlice.reducer;

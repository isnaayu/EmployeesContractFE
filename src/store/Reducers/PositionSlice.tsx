import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { PositionsResponse } from '../../types/positions';
import { createPositions, deletePositionById, getAllPositions } from '../../services/PositionService';

interface PositionState {
  positions: PositionsResponse[];
  loading: boolean;
  error: string | null;
}

const initialState: PositionState = {
  positions: [],
  loading: false,
  error: null,
};

export const fetchPositions = createAsyncThunk(
  'positions/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const response = await getAllPositions();
      return response.data.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to fetch branches',
      );
    }
  },
);

export const postPositions = createAsyncThunk(
    'positions/importdata-positions',
    async ({ file }: { file: File }, { rejectWithValue }) => {
        try {
            const response = await createPositions(file);
            return response.data.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Failed to import detail employee');
        }
    }
);

export const deletePosition = createAsyncThunk(
    'Position/delete',
    async (id: number, { rejectWithValue }) => {
        try {
            const response = await deletePositionById(id);
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Failed to delete detail employee');
        }
    }
);

const PositionSlice = createSlice({
  name: 'position',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
     .addCase(deletePosition.pending, (state) => {
        state.loading = true;
      })
      .addCase(deletePosition.fulfilled, (state, action) => {
        state.positions = state.positions.filter((position) => position.positionId!== action.payload);
      })
      .addCase(deletePosition.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
     .addCase(postPositions.pending, (state) => {
        state.loading = true;
      })
      .addCase(postPositions.fulfilled, (state, action) => {
        state.loading = false;
        state.positions = [...state.positions, action.payload];
      })
      .addCase(postPositions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchPositions.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchPositions.fulfilled, (state, action) => {
        state.loading = false;
        state.positions = action.payload;
      })
      .addCase(fetchPositions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default PositionSlice.reducer;

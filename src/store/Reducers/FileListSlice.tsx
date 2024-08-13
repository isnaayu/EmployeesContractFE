import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getAllFileList } from '../../services/FileListsService';
import { FileListsResponse } from '../../types/FileLists';

interface FileListState {
  fileLists: FileListsResponse[];
  loading: boolean;
  error: string | null;
}

const initialState: FileListState = {
  fileLists: [],
  loading: false,
  error: null,
};

export const fetchFileLists = createAsyncThunk(
  'fileList/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const response = await getAllFileList();
      return response.data.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to fetch fileList',
      );
    }
  },
);


const FileListSlice = createSlice({
  name: 'fileList',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFileLists.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchFileLists.fulfilled, (state, action) => {
        state.loading = false;
        state.fileLists = action.payload;
      })
      .addCase(fetchFileLists.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default FileListSlice.reducer;

import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { createDetailEmployee, deleteDetailEmployee, fetchAllDetailEmployees, fetchDetailEmployeeById, updateDetailEmployee } from '../../services/EmployeeService';
import { DetailEmployee, DetailEmployeeRequest } from '../../types/employee';

interface DetailEmployeeState {
    detailEmployees: DetailEmployee[];
    loading: boolean;
    error: string | null;
}

const initialState: DetailEmployeeState = {
    detailEmployees: [],
    loading: false,
    error: null,
};

export const getAllDetailEmployees = createAsyncThunk(
    'detailEmployee/getAll',
    async ({ daysUntilContractEnds }: { daysUntilContractEnds?: number }, { rejectWithValue }) => {
        try {
            const response = await fetchAllDetailEmployees(daysUntilContractEnds);
            //console.log(response.data.data)
            return response.data.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Failed to fetch detail employees');
        }
    }
);
export const getDetailEmployeeById = createAsyncThunk(
    'detailEmployee/getById',
    async (detailEmployeeId: number, { rejectWithValue }) => {
        try {
            const response = await fetchDetailEmployeeById(detailEmployeeId);
            console.log("slice"+JSON.stringify(response.data.data))
            return response.data.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Failed to fetch detail employee');
        }
    }
);


export const updateEmployeeAsync = createAsyncThunk(
    'detailEmployee/update',
    async (employeeRequest: DetailEmployeeRequest, { rejectWithValue }) => {
        try {
            const response = await updateDetailEmployee(employeeRequest);
            
            console.log("update"+response.data.data);
            return response.data.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Failed to update detail employee');
        }
    }
);

export const deleteEmployee = createAsyncThunk(
    'detailEmployee/delete',
    async (id: number, { rejectWithValue }) => {
        try {
            const response = await deleteDetailEmployee(id);
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Failed to delete detail employee');
        }
    }
);

export const postDetailEmployee = createAsyncThunk(
    'detailEmployee/importdata-employee',
    async ({ file, subjectName }: { file: File; subjectName: string }, { rejectWithValue }) => {
        try {
            const response = await createDetailEmployee(file, subjectName);
            return response.data.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Failed to import detail employee');
        }
    }
);


const EmployeeSlice = createSlice({
    name: 'detailEmployee',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getAllDetailEmployees.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getAllDetailEmployees.fulfilled, (state, action: PayloadAction<DetailEmployee[]>) => {
                state.loading = false;
                state.detailEmployees = action.payload;
            })
            .addCase(getAllDetailEmployees.rejected, (state, action: PayloadAction<any>) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(getDetailEmployeeById.fulfilled, (state, action: PayloadAction<DetailEmployee>) => {
                state.loading = false;
                const index = state.detailEmployees.findIndex(emp => emp.detailEmployeeId === action.payload.detailEmployeeId);
                if (index !== -1) {
                    state.detailEmployees[index] = action.payload;
                } else {
                    state.detailEmployees.push(action.payload);
                }
            })
            .addCase(updateEmployeeAsync.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateEmployeeAsync.fulfilled, (state, action: PayloadAction<DetailEmployee>) => {
                state.loading = false;
                const index = state.detailEmployees.findIndex(emp => emp.detailEmployeeId === action.payload.detailEmployeeId);
                if (index !== -1) {
                    state.detailEmployees[index] = action.payload;
                }
            })
            .addCase(updateEmployeeAsync.rejected, (state, action: PayloadAction<any>) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(deleteEmployee.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteEmployee.fulfilled, (state, action: PayloadAction<number>) => {
                state.loading = false;
                state.detailEmployees = state.detailEmployees.filter(emp => emp.detailEmployeeId !== action.payload);
            })
            .addCase(deleteEmployee.rejected, (state, action: PayloadAction<any>) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(postDetailEmployee.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(postDetailEmployee.fulfilled, (state, action: PayloadAction<DetailEmployee[]>) => {
                state.loading = false;
                state.detailEmployees = [...state.detailEmployees,...action.payload];
            })
            .addCase(postDetailEmployee.rejected, (state, action: PayloadAction<any>) => {
                state.loading = false;
                state.error = action.payload;
            })
    },
});

export default EmployeeSlice.reducer;

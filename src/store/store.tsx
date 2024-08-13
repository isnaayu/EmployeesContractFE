import { configureStore } from "@reduxjs/toolkit";
import employeeReducer from "./Reducers/EmployeeSlice";
import branchReducer from "./Reducers/BranchSlice";
import positionReducer from "./Reducers/PositionSlice";
import fileListReducer from "./Reducers/FileListSlice";

export const store = configureStore({
    reducer: {
        detailEmployee: employeeReducer,
        branch: branchReducer,
        position: positionReducer,
        fileList: fileListReducer
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
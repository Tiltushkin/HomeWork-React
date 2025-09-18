import { configureStore } from "@reduxjs/toolkit";
import { usersSlice } from "../slices/usersSlice";
import studentsReducer from '../slices/studentsSlice';

export const store = configureStore({
    reducer: {
        users: usersSlice.reducer,
        students: studentsReducer,
    },
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

import { useDispatch } from 'react-redux';
import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";
import UserSlice from './UserSlice';


export const store = configureStore({
    reducer: {
        user: UserSlice
    }
});


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk = ThunkAction<void, RootState, null, Action<string>>
export const useAppDispatch = () => useDispatch<AppDispatch>()
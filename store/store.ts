
import { useDispatch } from 'react-redux';
import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";
import UserSlice from './UserSlice';
import GameSlice from './GameSlice';
import  CartShowSlice  from './CartShowSlice';
import CartSlice from './CartSlice';
import  UserShowSlice from './ShowUpdate';


export const store = configureStore({
    reducer: {
        user: UserSlice,
        game: GameSlice,
        showCart: CartShowSlice,
        cart: CartSlice,
        update: UserShowSlice
    }
});


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk = ThunkAction<void, RootState, null, Action<string>>
export const useAppDispatch = () => useDispatch<AppDispatch>()
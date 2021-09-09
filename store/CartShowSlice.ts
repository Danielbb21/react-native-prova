import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { api } from "../api";
import { AppDispatch, AppThunk } from "./store";

const initialStateCart = {
    isShow: false,
    showComponent: false
}

export const CartShowSlice = createSlice({
    name: 'cartShow',
    initialState: initialStateCart,
    reducers: {
        showCart: (state) => {
            state.isShow = true;
        },

        hideCart: (state) => {
            state.isShow = false;
        },
        showCartComponent: (state) => {
            state.showComponent = true;
            
        },

        hideCartComponent: (state) => {
            state.showComponent = false;
        }

    }
});

export const { showCart, hideCart, showCartComponent, hideCartComponent } = CartShowSlice.actions;
export default CartShowSlice.reducer;

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Toast from "react-native-toast-message";

import { api } from "../api";
import { AppDispatch, AppThunk } from "./store";

interface CartObj {

    maxNumber: number;
    type: string;
    price: string;
    color: string;
    gameNumbers: string;
    date_game?: string;
    game_date: string;
    game_id: number;
    user_id: number;
}
interface CartState {
    items: CartObj[];
}

const initialStateCart: CartState = {
    items: []
}


export const cartSlice = createSlice({
    name: 'cart',
    initialState: initialStateCart,
    reducers: {
        addToCart: (state, action: PayloadAction<CartObj[]>) => {
            console.log('action', action.payload);

            action.payload.forEach((game) => {
                state.items.push(game);
            });


        }
    }
});

export const { addToCart } = cartSlice.actions;

// export const selectCart = (state: RootState) => state.cart.;
interface GameData {
    gameNumbers: number[];
    price: number,
    game_date: string,
    game_id: string;
}


export function getBetData(token: string, data: GameData[]): AppThunk {
    return async function (dispatch: AppDispatch) {

        api.post('/gamble', { data }, { headers: { Authorization: `Bearer ${token}` } })
            .then(response => {

                dispatch(addToCart(response.data));
                Toast.show({
                    type: "success",
                    text1: "Success",
                    text2: "bets saved sucesfully",
                    visibilityTime: 1000,
                    autoHide: true,
                    topOffset: 30,
                    bottomOffset: 40,
                });

            })
            .catch(err => {
                Toast.show({
                    type: "error",
                    text1: "Error",
                    text2: "Sommeting Went Wrong",
                    visibilityTime: 1000,
                    autoHide: true,
                    topOffset: 30,
                    bottomOffset: 40,
                });
                console.log(err.message);
            })
    }


}



export default cartSlice.reducer;
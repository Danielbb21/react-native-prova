import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { api } from "../api";
import { AppDispatch, AppThunk } from "./store";

interface GameObj {
    id: string;
    type: string;
    description: string;
    range: number;
    price: number;
    "max-number": number;
    color: string;
    "min-cart-value": number;
    "created_at": Date;
    "updated_at": Date;
}

interface GameState {
    items: GameObj[];
}

const initialStateGame: GameState = {
    items: []
}

export const gameSlice = createSlice({
    name: 'cart',
    initialState: initialStateGame,
    reducers: {
        addGames: (state, action: PayloadAction<GameObj[]>) => {

            state.items = [];
            action.payload.forEach((game) => {
                state.items.push(game);
            });

        }
    }
});

export const { addGames } = gameSlice.actions;
export default gameSlice.reducer;

export function getGameData(token: string): AppThunk {
    return async function (dispatch: AppDispatch) {

        api
            .get("/game", {
                headers: { Authorization: `Bearer ${token}` }

            })
            .then((response) => {
                dispatch(addGames(response.data));
            })
            .catch((err) => {
                console.log(err.message);

            });
    }


}
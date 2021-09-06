import { api } from './../api/index';
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import Toast from "react-native-toast-message";
import { AppDispatch, AppThunk } from "./store";
import AsyncStorage from '@react-native-async-storage/async-storage';




const UserObj = {

    isLoggedIn: false,
    token: '',
    info: {
        id: '',
        email: '',
        name: '',
        password: '',
        gambles: []
    }

}



interface UserInformation {
    id: string;
    name: string;
    email: string;
    password?: string;
    gamble?: [];
}

export const UserSlice = createSlice({
    name: 'user',
    initialState: UserObj,
    reducers: {
        login: (state, action: PayloadAction<string>) => {

            const data = action.payload;
            AsyncStorage.setItem('token', data).then().catch();
            // localStorage.setItem('token', data);
            state.isLoggedIn = true;
            state.isLoggedIn = true;
            state.token = data;
            return state;
        },
        logOut: (state) => {
            AsyncStorage.removeItem('token').then().catch();
            // localStorage.removeItem('token');
            state.isLoggedIn = false;
            state.token = '',
            state.isLoggedIn = false;
        },

        setUserInfo: (state, action: PayloadAction<UserInformation>) => {
            state.info.email = action.payload.email;
            state.info.name = action.payload.name;
            state.info.id = action.payload.id;
            if (action.payload.password) {
                state.info.password = action.payload.password;
            }
            if (action.payload.gamble) {
                state.info.gambles = action.payload.gamble.map(gamble => gamble);
            }

        }
    }
});


export const { login, logOut, setUserInfo } = UserSlice.actions;
export default UserSlice.reducer;

export function logUser(email: string, password: string): AppThunk {
    return async function (dispatch: AppDispatch) {
        api
            .post("/session", {
                email: email,
                password: password,
            })
            .then((response) => {
                const token = response.data.token;
                
                dispatch(login(token));
                return true;

            })
            .catch((err) => {

                if (err.message === 'Request failed with status code 400') {
                    Toast.show({
                        type: "error",
                        text1: "Error",
                        text2: "Email password combination is wrong",
                        visibilityTime: 1000,
                        autoHide: true,
                        topOffset: 30,
                        bottomOffset: 40,
                    });

                } else {
                    Toast.show({
                        type: "error",
                        text1: "Error",
                        text2: "Sommeting went wrong",
                        visibilityTime: 1000,
                        autoHide: true,
                        topOffset: 30,
                        bottomOffset: 40,
                    });
                }
                console.log(err.message);
                return false;
            });
    }


}

export function getUserInfo(token: string): AppThunk {
    return async function (dispatch: AppDispatch) {
        api.get('/user', {
            headers: { Authorization: `Bearer ${token}` }
        }).then(response => {

            dispatch(setUserInfo({ email: response.data[0].email, name: response.data[0].name, gamble: response.data[0].gambles, id: response.data[0].id }));

        })
            .catch(err => {
                console.log(err.message);
            })
    }


}
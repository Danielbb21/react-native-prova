import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialStateCart = {
    isShow: false,

}

export const UserShowSlice = createSlice({
    name: 'cartShow',
    initialState: initialStateCart,
    reducers: {
        showUpdate: (state) => {
            state.isShow = true;
        },

        hideUpdate: (state) => {
            state.isShow = false;
        },


    }
});

export const { showUpdate, hideUpdate } = UserShowSlice.actions;
export default UserShowSlice.reducer;

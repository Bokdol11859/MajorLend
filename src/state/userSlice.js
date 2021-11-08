import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    id: null,
    uid: null,
    name: null,
    email: null,
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        login: (state, action) => {
            state.id = action.payload.id;
            state.uid = action.payload.uid;
            state.name = action.payload.name;
            state.email = action.payload.email;
        },
        logout: (state) => {
            state.uid = null;
            state.name = null;
            state.email = null;
            state.id = null;
        }
    }
})

export const { login, logout } = userSlice.actions;

export default userSlice.reducer;
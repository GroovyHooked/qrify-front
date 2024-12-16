import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    value: {
        email: '',
        token: '',
        firstname: ''
    },
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        addUserToStore: (state, action) => {
            state.value.email = action.payload.email;
            state.value.token = action.payload.token;
            state.value.firstname = action.payload.firstname;
        },
        removeUserFromStore: (state) => {
            state.value.email = '';
            state.value.token = '';
            state.value.firstname = '';
        }
    },
});

export const { addUserToStore, removeUserFromStore } = userSlice.actions;
export default userSlice.reducer;
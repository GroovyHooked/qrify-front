import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    value: {
        email: '',
        token: '',
        firstname: '',
        lastname: '',
        avatar: ''
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
            state.value.avatar = action.payload.avatar;
            state.value.lastname = action.payload.lastname;
        },
        removeUserFromStore: (state) => {
            state.value.email = '';
            state.value.token = '';
            state.value.firstname = '';
            state.value.avatar = '';
            state.value.lastname = '';
        },
        changeAvatarPath: (state, action) => {
            console.log({ action });

            state.value.avatar = action.payload;
        }
    },
});

export const { addUserToStore, removeUserFromStore, changeAvatarPath } = userSlice.actions;
export default userSlice.reducer;
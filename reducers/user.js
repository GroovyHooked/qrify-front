import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    value: {
        email: '',
        token: '',
        firstname: '',
        lastname: '',
        avatar: '',
        progressString: 'Ajouter un client',
        qrCodeMainColor: '',
        qrCodeBackgroundColor: ''
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
            state.value.qrCodeMainColor = action.payload.qrCodeMainColor;
            state.value.qrCodeBackgroundColor = action.payload.qrCodeBackgroundColor;
        },
        removeUserFromStore: (state) => {
            state.value.email = '';
            state.value.token = '';
            state.value.firstname = '';
            state.value.avatar = '';
            state.value.lastname = '';
            state.value.qrCodeMainColor = '';
            state.value.qrCodeBackgroundColor = '';
        },
        changeAvatarPath: (state, action) => {
            state.value.avatar = action.payload;
        },
        updateProgress: (state, action) => {
            state.value.progressString = action.payload
        },
        updateBackgroundColor: (state, action) => {
            state.value.qrCodeBackgroundColor = action.payload
        },
        updateMainColor: (state, action) => {
            state.value.qrCodeMainColor = action.payload
        }
    },
});

export const { addUserToStore, removeUserFromStore, changeAvatarPath, updateProgress, updateBackgroundColor, updateMainColor } = userSlice.actions;
export default userSlice.reducer;
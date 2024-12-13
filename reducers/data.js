import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    value: {
        customer: {},
        card: {}
    },
};

export const dataSlice = createSlice({
    name: 'data',
    initialState,
    reducers: {
        addCustomerToStore: (state, action) => {
            state.value.customer = action.payload;
        },
        removeCustomerFromStore: (state) => {
            state.value.customer = {};
        },
        addCardToStore: (state, action) => {
            state.value.card = action.payload;
        },
        removeCardFromStore: (state) => {
            state.value.card = {};
        },
        cleanStore: (state) => {
            state.value = {
                customer: {},
                card: {}
            }
        }
    },
});

export const { addCustomerToStore, removeCustomerFromStore, addCardToStore, removeCardFromStore, cleanStore } = dataSlice.actions;
export default dataSlice.reducer;
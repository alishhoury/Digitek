import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    products : [],
    message : ""
}

const stockSlice = createSlice({
    name : "stock",
    initialState,
    reducers: {
        setProducts: (state, action) => {
            state.products = action.payload;
        },
        setMessage: (state, action) => {
            state.message = action.payload;
        }
    }    
});

export const {
    setProducts,
    setMessage,
} = stockSlice.actions;

export default stockSlice.reducer;
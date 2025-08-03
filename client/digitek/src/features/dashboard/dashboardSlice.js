import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    orders: [],
    updatingId: null
}

const dashboardSlice = createSlice({
    name: "dashboard", 
    initialState,
    reducers: {
        setOrders: (state, action) =>  {
            state.orders = action.payload;
        },
        setUpdatingId: (state, action) => {
            state.updatingId = action.payload;
        }
    }

});

export const {
    setOrders,
    setUpdatingId
} = dashboardSlice.actions;

export default dashboardSlice.reducer;
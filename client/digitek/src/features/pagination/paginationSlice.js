import { createSlice, current } from '@reduxjs/toolkit';

const initialState = {
    hasNext: false,
    currentPage:1,
    nextPageUrl: null,
}

const paginationSlice = createSlice({
    name: "pagination",
    initialState,
    reducers: {
        setHasNext: (state, action) => {
            state.hasNext = action.payload.hasNext;
            state.currentPage = action.payload.currentPage;
            state.nextPageUrl = action.payload.nextPageUrl;
        }
    }
})

export const { setHasNext } = paginationSlice.actions;
export default paginationSlice.reducer;
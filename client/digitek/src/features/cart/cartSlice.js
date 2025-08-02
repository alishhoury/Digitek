import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItems: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const { product_id, quantity } = action.payload;

      const existingItem = state.cartItems.find(
        item => item.product_id === product_id
      );

      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        state.cartItems.push({ product_id, quantity });
      }
    },
    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter(
        item => item.product_id !== action.payload
      );
    },
    incrementQuantity: (state, action) => {
      const item = state.cartItems.find(
        item => item.product_id === action.payload
      );
      if (item) {
        item.quantity += 1;
      }
    },
    decrementQuantity: (state, action) => {
      const item = state.cartItems.find(
        item => item.product_id === action.payload
      );
      if (item && item.quantity > 1) {
        item.quantity -= 1;
      }
    },
    clearCart: state => {
      state.cartItems = [];
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  incrementQuantity,
  decrementQuantity,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;

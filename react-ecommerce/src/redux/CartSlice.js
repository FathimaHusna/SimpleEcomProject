import { createSlice } from "@reduxjs/toolkit";

const initialState = JSON.parse(localStorage.getItem('cart')) || []; // Parse the cart data from localStorage or set as empty array

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action) {
      const existing = state.find((item) => item.id === action.payload.id);
      if (existing) {
        existing.quantity += 1;
      } else {
        state.push({ ...action.payload, quantity: 1 });
      }
      // Save updated state to localStorage after modification
      localStorage.setItem("cart", JSON.stringify(state));
    },
    updateQuantity(state, action) {
      const item = state.find((item) => item.id === action.payload.id);
      if (item) {
        item.quantity = action.payload.quantity;
      }
      // Save updated state to localStorage after modification
      localStorage.setItem("cart", JSON.stringify(state));
    },
    removeFromCart(state, action) {
      const updatedCart = state.filter((item) => item.id !== action.payload);
      // Save updated state to localStorage after removing an item
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      return updatedCart; // Return the updated cart state
    },
  },
});

export const { addToCart, updateQuantity, removeFromCart } = cartSlice.actions;
export default cartSlice.reducer;

import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],
  },
  reducers: {
    addToCart(state, action) {
      const prod = action.payload;
      const existing = state.items.find(item => item.productId === prod.productId);
      if (existing) {
        existing.quantity += 1;
      } else {
        state.items.push({
          productId: prod.productId,
          brand: prod.brand,
          displayName: prod.displayName,
          image: prod.mediaUrls[0],
          pricePerUnit: prod.prices?.[0]?.priceWithoutFormatting || 0,
          quantity: 1,
        });
      }
    },
    removeFromCart(state, action) {
      state.items = state.items.filter(item => item.productId !== action.payload);
    },
    clearCart(state) {
      state.items = [];
    }
  }
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;

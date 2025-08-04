// src/store/index.js
import { configureStore } from '@reduxjs/toolkit';
import productsReducer from '../features/products/productsSlice';
import cartReducer     from '../features/cart/cartSlice';
import rentalReducer   from '../features/rental/rentalSlice';
import rentalHistoryReducer    from '../features/rental/rentalHistorySlice';
import { loadState, saveState } from '../utils/storage';

const PERSISTED_CART_KEY = 'rentalAppCart';
const HISTORY_KEY = 'rentalAppHistory';

const persistedCart = loadState(PERSISTED_CART_KEY);
const persistedHistory = loadState(HISTORY_KEY);

const store = configureStore({
  reducer: {
    products: productsReducer,
    cart:     cartReducer,
    rental:   rentalReducer,
    rentalHistory:  rentalHistoryReducer,
  },
  preloadedState: {
    cart: persistedCart,
    rentalHistory: persistedHistory
  }
});

store.subscribe(() => {
  const state = store.getState();
  saveState(PERSISTED_CART_KEY, state.cart);
  saveState(HISTORY_KEY, state.rentalHistory);
});

export default store;

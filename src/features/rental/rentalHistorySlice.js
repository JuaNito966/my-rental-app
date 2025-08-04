import { createSlice } from '@reduxjs/toolkit';

const rentalHistorySlice = createSlice({
  name: 'rentalHistory',
  initialState: {
    items: []  
  },
  reducers: {
    addRental(state, action) {
      state.items.push(action.payload);
    },
    clearHistory(state) {
      state.items = [];
    }
  }
});

export const { addRental, clearHistory } = rentalHistorySlice.actions;
export default rentalHistorySlice.reducer;

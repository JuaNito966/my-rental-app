import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchProducts } from '../../api/products';

export const loadProducts = createAsyncThunk(
  'products/load',
  async (params, thunkAPI) => {
    try {
      return await fetchProducts(params);
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

const productsSlice = createSlice({
  name: 'products',
  initialState: {
    items: [],       
    status: 'idle',
    error: null
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(loadProducts.pending, state => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(loadProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items  = action.payload;   
      })
      .addCase(loadProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error  = action.payload;
      });
  }
});

export default productsSlice.reducer;

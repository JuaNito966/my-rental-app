import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  product: null,           
  fechaInicio: null,       
  fechaFinal: null,        
  diasAlquiler: 0,         
  cantidad: 1,             
  precioDia: 10,            
};

const rentalSlice = createSlice({
  name: 'rental',
  initialState,
  reducers: {
    selectProduct(state, action) {
      const prod = action.payload;
      state.product     = prod;
      state.precioDia   = prod.prices?.[0]?.priceWithoutFormatting ?? 0;
      state.cantidad    = 1;
      state.fechaInicio = null;
      state.fechaFinal  = null;
      state.diasAlquiler = 0;
    },
    setFechaInicio(state, action) {
      state.fechaInicio = action.payload;
      if (state.fechaFinal && state.fechaInicio) {
        const diff = 
          (new Date(state.fechaFinal) - new Date(state.fechaInicio))
          / (1000*60*60*24) + 1;
        state.diasAlquiler = diff > 0 ? Math.floor(diff) : 0;
      }
    },
    setFechaFinal(state, action) {
      state.fechaFinal = action.payload;
      if (state.fechaInicio && state.fechaFinal) {
        const diff = 
          (new Date(state.fechaFinal) - new Date(state.fechaInicio))
          / (1000*60*60*24) + 1;
        state.diasAlquiler = diff > 0 ? Math.floor(diff) : 0;
      }
    },
    setCantidad(state, action) {
      const val = action.payload;
      state.cantidad = Number.isInteger(val) && val > 0 ? val : state.cantidad;
    },
    clearRental(state) {
      return initialState;
    }
  }
});

export const {
  selectProduct,
  setFechaInicio,
  setFechaFinal,
  setCantidad,
  clearRental
} = rentalSlice.actions;

export default rentalSlice.reducer;

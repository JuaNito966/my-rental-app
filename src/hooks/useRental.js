// src/hooks/useRental.js
import { useDispatch, useSelector } from 'react-redux';
import {
  selectProduct,
  setFechaInicio,
  setFechaFinal,
  setCantidad,
  clearRental
} from '../features/rental/rentalSlice';

/**
 * useRental
 * Encapsula la lógica de selección de producto, fechas, cantidad y cálculos de rentalSlice.
 */
export function useRental() {
  const dispatch = useDispatch();
  const {
    product,
    fechaInicio,
    fechaFinal,
    diasAlquiler,
    cantidad,
    precioDia
  } = useSelector(state => state.rental);

  // Acciones
  const chooseProduct = prod => dispatch(selectProduct(prod));
  const setStartDate  = date => dispatch(setFechaInicio(date));
  const setEndDate    = date => dispatch(setFechaFinal(date));
  const setQty        = qty  => dispatch(setCantidad(qty));
  const resetRental   = ()   => dispatch(clearRental());

  // Cálculo de total
  const totalCost = diasAlquiler * cantidad * precioDia;

  return {
    // estado
    product,
    fechaInicio,
    fechaFinal,
    diasAlquiler,
    cantidad,
    precioDia,
    totalCost,

    // acciones
    chooseProduct,
    setStartDate,
    setEndDate,
    setQty,
    resetRental
  };
}
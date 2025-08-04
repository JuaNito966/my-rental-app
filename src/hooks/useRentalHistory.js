import { useSelector, useDispatch } from 'react-redux';
import { addRental, clearHistory } from '../features/rental/rentalHistorySlice';

/**
 * Hook para acceder al historial de alquileres
 */
export function useRentalHistory() {
  const dispatch = useDispatch();
  const items    = useSelector(state => state.rentalHistory.items);

  const add   = record => dispatch(addRental(record));
  const clear = ()     => dispatch(clearHistory());

  const count = items.length;

  return { items, count, add, clear };
}

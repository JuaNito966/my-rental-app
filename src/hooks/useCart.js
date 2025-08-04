import { useSelector, useDispatch } from 'react-redux';
import {
  addToCart,
  removeFromCart,
  clearCart
} from '../features/cart/cartSlice';

/**
 * Hook para acceder y modificar el carrito
 * @returns {{
 *   items: Array,
 *   count: number,
 *   total: number,
 *   add: (product: Object) => void,
 *   remove: (productId: string) => void,
 *   clear: () => void
 * }}
 */
export function useCart() {
  const dispatch = useDispatch();
  const items = useSelector(state => state.cart.items);

  const count = items.reduce((sum, it) => sum + it.quantity, 0);
  const total = items.reduce(
    (sum, it) => sum + it.quantity * it.pricePerUnit,
    0
  );

  // Acciones
  const add    = product   => dispatch(addToCart(product));
  const remove = productId => dispatch(removeFromCart(productId));
  const clear  = ()        => dispatch(clearCart());

  return { items, count, total, add, remove, clear };
}

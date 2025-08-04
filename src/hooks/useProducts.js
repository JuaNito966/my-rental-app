import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadProducts } from '../features/products/productsSlice';

/**
 * Hook para cargar y exponer el listado de productos
 * @param {{ page?: number, zone?: number }} opts
 * @returns {{ products: any[], status: string, error: string|null }}
 */
export function useProducts({ page = 1, zone = 1 } = {}) {
  const dispatch = useDispatch();
  const { items, status, error } = useSelector(state => state.products);

  useEffect(() => {
    dispatch(loadProducts({ currentpage: page, zoneId: zone }));
  }, [dispatch, page, zone]);

  return {
    products: items,
    status,
    error,
  };
}

import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Link } from 'react-router-dom';
import { es } from 'date-fns/locale';

import { useModal }         from '../../contexts/ModalContext';
import { useCart }          from '../../hooks/useCart';
import { useRental }        from '../../hooks/useRental';
import { useRentalHistory } from '../../hooks/useRentalHistory';
import { downloadJSON }     from '../../utils/fileUtils';

import styles from './Rental.module.scss';

export default function Rental() {
  const { items: cartItems, remove: removeFromCart } = useCart();

  const {
    product,
    fechaInicio,
    fechaFinal,
    diasAlquiler,
    cantidad,
    precioDia,
    totalCost,
    chooseProduct,
    setStartDate,
    setEndDate,
    setQty,
    resetRental
  } = useRental();

  const { items: historyItems, add: addHistory } = useRentalHistory();
  const { openModal } = useModal();

  const canPickDates = Boolean(product);
  const validDates   = fechaInicio && fechaFinal && diasAlquiler > 0;
  const canContinue  = validDates && cantidad > 0;

  const handleContinue = () => {
    const record = {
      fechaInicio:         fechaInicio.toISOString().split('T')[0],
      fechaFinal:          fechaFinal.toISOString().split('T')[0],
      diasAlquiler,
      producto:            product.productId,
      descripcionProducto: product.displayName,
      precioDia,
      quantity:            cantidad,
      imageUrl:            product.image || ''
    };

    addHistory(record);

    downloadJSON([...historyItems, record], 'rental-history.json');

    openModal(
      <div className={styles.confirm}>
        <span>✅</span> Producto agregado con éxito.
      </div>
    );

    resetRental();

    removeFromCart(product.productId);
  };

  return (
    <div className={styles.rental}>
      <h2>1) Selecciona el producto</h2>
      {cartItems.length === 0 ? (
        <p>No hay productos en el carrito. <Link to="/">Volver</Link></p>
      ) : (
        <ul className={styles.prodList}>
          {cartItems.map(item => (
            <li key={item.productId}>
              <label>
                <input
                  type="radio"
                  name="prod"
                  value={item.productId}
                  checked={product?.productId === item.productId}
                  onChange={() => chooseProduct(item)}
                />{' '}
                {item.displayName}
              </label>
            </li>
          ))}
        </ul>
      )}

      <h2>2) Elige fechas</h2>
      <div className={styles.dates}>
        <DatePicker
          className={styles.datePicker}
          selected={fechaInicio}
          onChange={setStartDate}
          placeholderText="Fecha inicio"
          disabled={!canPickDates}
          locale={es}
        />
        <strong>hasta</strong>
        <DatePicker
          className={styles.datePicker}
          selected={fechaFinal}
          onChange={setEndDate}
          placeholderText="Fecha final"
          disabled={!canPickDates || (!validDates && !fechaInicio)}
          minDate={fechaInicio}
          locale={es}
        />
      </div>

      <h2>3) Cantidad y total</h2>
      {validDates && (
        <div className={styles.calc}>
          <label>
            Cantidad de unidades:{' '}
            <input
              type="number"
              min="1"
              step="1"
              className={styles.qtyInput}
              value={cantidad}
              onChange={e => setQty(parseInt(e.target.value, 10) || 1)}
            />
          </label>

          <p>
            Días: <strong>{diasAlquiler}</strong> × Precio/día:{' '}
            <strong>${precioDia}</strong> × Unidades:{' '}
            <strong>{cantidad}</strong>
          </p>

          <p className={styles.total}>
            Total alquiler: <strong>${totalCost}</strong>
          </p>

          <button
            className={styles.continue}
            disabled={!canContinue}
            onClick={handleContinue}
          >
            Continuar
          </button>
        </div>
      )}
    </div>
  );
}
import React from "react";
import { useCart } from "../../hooks/useCart";
import { useModal } from "../../contexts/ModalContext";
import styles from "./Cart.module.scss";
import { Link, useNavigate } from "react-router-dom";
import { formatCOP } from "../../utils/format";

export default function Cart() {
  const { items, total, remove, clear } = useCart();
  const navigate = useNavigate();
  const { openModal } = useModal();

  const handleRemove = (id) => {
    remove(id);
    openModal(
      <div className={styles.confirm}>
        <span>✅</span> Producto Eliminado del carrito
      </div>
    );
  };

  if (!items.length) {
    return (
      <div className={styles.empty}>
        <p>No tienes productos agregados al carrito</p>
        <Link to="/">Volver al catálogo</Link>
      </div>
    );
  }
  return (
    <div className={styles.cart}>
      <h2>Tu Carrito</h2>
      <ul className={styles.list}>
        {items.map((item) => (
          <li key={item.productId} className={styles.item}>
            <div className={styles.details}>
              <img
                alt={`Ìmagen del Producto ${item.displayName}`}
                src={item.image}
                className={styles.image}
              />
              <divx className={styles.info}>
                <p className={styles.brand}>{item.brand}</p>
                <strong>{item.displayName}</strong>
                <p>Cantidad: {item.quantity}</p>
              </divx>
            </div>
            <div className={styles.actions}>
              <p>
                {formatCOP(item.pricePerUnit)} × {item.quantity} = {' '} 
                {formatCOP(item.pricePerUnit * item.quantity)}
              </p>
              <button
                onClick={() => handleRemove(item.productId)}
                className={styles.removeBtn}
              >
                Eliminar
              </button>
            </div>
          </li>
        ))}
      </ul>

      <div className={styles.summary}>
        <p>
          Total carrito: <strong>{formatCOP(total)}</strong>
        </p>
        <button onClick={() => navigate("/rental")} className={styles.checkout}>
          Continuar con el alquiler
        </button>
        <button onClick={clear} className={styles.clear}>
          Vaciar carrito
        </button>
      </div>
    </div>
  );
}

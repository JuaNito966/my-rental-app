import React from "react";
import { Link } from "react-router-dom";
import { useRentalHistory } from "../../hooks/useRentalHistory";
import styles from "./RentalHistory.module.scss";

export default function RentalHistory() {
  const { items, clear } = useRentalHistory();

  if (items.length === 0) {
    return (
      <div className={styles.empty}>
        <p>No hay alquileres registrados.</p>
        <Link to="/">Volver al catálogo</Link>
      </div>
    );
  }

  return (
    <div className={styles.history}>
      <h2>Historial de Alquileres</h2>
      <ul className={styles.list}>
        {items.map((r) => (
          <li key={r.descripcionProducto} className={styles.item}>
            <img
              src={r.imageUrl}
              alt={r.descripcionProducto}
              className={styles.thumbnail}
            />
            <p>
              <strong>Producto:</strong> {r.descripcionProducto}
            </p>
            <p>
              <strong>Cantidad:</strong> {r.quantity}
            </p>
            <p>
              <strong>Fechas:</strong> {r.fechaInicio} → {r.fechaFinal}
            </p>
            <p>
              <strong>Días:</strong> {r.diasAlquiler}
            </p>
            <p>
              <strong>Precio/día:</strong> ${r.precioDia}
            </p>
          </li>
        ))}
      </ul>
      <div className={styles.actions}>
        <button onClick={clear} className={styles.clearBtn}>
          Limpiar historial
        </button>
        <Link to="/" className={styles.backBtn}>
          Volver al catálogo
        </Link>
      </div>
    </div>
  );
}

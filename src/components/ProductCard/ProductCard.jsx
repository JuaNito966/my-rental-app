import React from "react";
import styles from "./ProductCard.module.scss";

export default function ProductCard({ product, onAdd, onView }) {
  const { displayName, mediaUrls, prices, brand } = product;
  const img = mediaUrls?.[0] || "";
  const priceObj = prices?.[0] || {};
  const priceText = priceObj.price || priceObj.priceWithoutFormatting;

  return (
    <div className={styles.card}>
      <div className={styles.media}>
        {img && <img src={img} alt={displayName} />}
      </div>
      <div className={styles.info}>
        <p className={styles.brand}>{brand}</p>
        <h3 className={styles.title}>{displayName}</h3>
        <p className={styles.price}>
          ${priceText} / {priceObj.unit}
        </p>
        <button className={styles.detailsBtn} onClick={onView}>
          Ver detalles
        </button>
        <button className={styles.btn} onClick={onAdd}>
          Agregar
        </button>
      </div>
    </div>
  );
}

import React from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../contexts/ModalContext";
import { addToCart } from "../../features/cart/cartSlice";
import StarRating from "../StarRating/StarRating";

import styles from "./ProductDetail.module.scss";

export default function ProductDetail({ product }) {
  const dispatch = useDispatch();
  const { closeModal, openModal } = useModal();
  const { displayName, brand, mediaUrls, prices, highlights, rating, totalReviews = [] } = product;

  const imageUrl = mediaUrls?.[0] || "";
  const priceObj = prices?.[0] || {};
  const priceText =
    priceObj.symbol + (priceObj.price || priceObj.priceWithoutFormatting);

  const handleAdd = () => {
    dispatch(addToCart(product));
    openModal(
      <div className={styles.confirm}>
        <span>✅</span> Producto agregado con éxito.
      </div>
    );
  };

  return (
    <>
      <header className={styles.header}>
        <h2 className={styles.title}>{displayName}</h2>
        <button className={styles.closeBtn} onClick={closeModal}>
          &times;
        </button>
      </header>
      <div className={styles.body}>
        {imageUrl && (
          <img src={imageUrl} alt={displayName} className={styles.image} />
        )}
        <div className={styles.details}>
          {brand && (
            <p>
              <strong>Marca:</strong> {brand}
            </p>
          )}
          {highlights.length > 0 && (
            <ul className={styles.highlights}>
              {highlights.map((h) => (
                <li key={h.key}>
                  <strong>{h.key}:</strong> {h.value}
                </li>
              ))}
            </ul>
          )}
          {rating && (
            <StarRating rating={parseFloat(rating)} reviews={totalReviews} />
          )}
          <p className={styles.price}>
            {priceText} / {priceObj.unit}
          </p>
        </div>
      </div>

      <footer className={styles.footer}>
        <button className={styles.addBtn} onClick={handleAdd}>
          Agregar al carrito
        </button>
        <button className={styles.cancelBtn} onClick={closeModal}>
          Cerrar
        </button>
      </footer>
    </>
  );
}

// src/components/Header/Header.jsx
import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useCart } from "../../hooks/useCart";
import styles from "./Header.module.scss";

// ICONS
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { useRentalHistory } from "../../hooks/useRentalHistory";

export default function Header() {
  const { count } = useCart();
  const { count: rented } = useRentalHistory();

  return (
    <header className={styles.header}>
      <Link to="/" className={styles.logo}>
        RENTAL WEB
      </Link>
      <div className={styles.links}>
        <Link to="/rentals" className={styles.rentalsLink}>
          <strong>Alquilados {rented > 0 && <span>({rented})</span>}</strong>
        </Link>
        <Link to="/cart" className={styles.cartLink}>
          {count > 0 && <span className={styles.count}>{count}</span>}
          <FontAwesomeIcon icon={faShoppingCart} size="2x" />
        </Link>
      </div>
    </header>
  );
}

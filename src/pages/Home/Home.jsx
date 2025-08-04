import React from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../../features/cart/cartSlice";
import { useModal } from "../../contexts/ModalContext";
import ProductCard from "../../components/ProductCard/ProductCard";
import ProductDetail from "../../components/ProductDetail/ProductDetail";

import { useProducts } from "../../hooks/useProducts";

import styles from "./Home.module.scss";

export default function Home() {
  const dispatch = useDispatch();
  const { openModal } = useModal();
  const { products, status, error } = useProducts({ page: 1, zone: 1 });

  const handleView = (product) => {
    openModal(<ProductDetail product={product} />);
  };

  const handleAdd = (product) => {
    dispatch(addToCart(product));
    openModal(
      <div className={styles.confirm}>
        <span>✅</span> Producto agregado con éxito.
      </div>
    );
  };

  if (status === "loading") return <p>Cargando productos…</p>;
  if (status === "failed") return <p>Error: {error}</p>;
  if (!products.length) return <p>No hay productos disponibles.</p>;

  return (
    <div className={styles.home}>
      <h1>Productos disponibles</h1>
      <div className={styles.grid}>
        {products.map((p) => (
          <ProductCard
            key={p.productId}
            product={p}
            onAdd={() => handleAdd(p)}
            onView={() => handleView(p)}
          />
        ))}
      </div>
    </div>
  );
}

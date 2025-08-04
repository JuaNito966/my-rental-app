// src/components/StarRating/StarRating.jsx
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './StarRating.module.scss';

/**
 * @param {{ rating: number; reviews: string|number }} props
 */
export default function StarRating({ rating, reviews }) {
  const rate = Math.min(Math.max(rating, 0), 5);
  const fullStars = Math.floor(rate);
  const hasHalf = rate - fullStars >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalf ? 1 : 0);

  return (
    <div className={styles.starRating}>
      {Array.from({ length: fullStars }).map((_, i) => (
        <FontAwesomeIcon
          key={`full-${i}`}
          icon="star"
          className={styles.full}
        />
      ))}
      {hasHalf && (
        <FontAwesomeIcon
          icon="star-half-alt"
          className={styles.half}
        />
      )}
      {Array.from({ length: emptyStars }).map((_, i) => (
        <FontAwesomeIcon
          key={`empty-${i}`}
          icon={['far', 'star']}
          className={styles.empty}
        />
      ))}
      <span className={styles.text}>
        {rate.toFixed(1)} ({reviews})
      </span>
    </div>
  );
}

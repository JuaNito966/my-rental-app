import React from 'react';
import { useModal } from '../../contexts/ModalContext';
import styles from './Modal.module.scss';

export default function Modal() {
  const { isOpen, content, closeModal } = useModal();

  if (!isOpen) return null;

  return (
    <div className={styles.overlay} onClick={closeModal}>
      <div 
        className={styles.modal} 
        onClick={e => e.stopPropagation()}
      >
        <button className={styles.closeBtn} onClick={closeModal}>
          &times;
        </button>
        <div className={styles.content}>
          {content}
        </div>
      </div>
    </div>
  );
}

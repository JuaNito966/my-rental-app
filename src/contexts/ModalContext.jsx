import React, { createContext, useState, useContext } from 'react';

const ModalContext = createContext();

export function ModalProvider({ children }) {
  const [isOpen, setIsOpen]     = useState(false);
  const [content, setContent]   = useState(null);

  const openModal = (node) => {
    setContent(node);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setContent(null);
  };

  return (
    <ModalContext.Provider value={{ isOpen, content, openModal, closeModal }}>
      {children}
    </ModalContext.Provider>
  );
}

export function useModal() {
  const ctx = useContext(ModalContext);
  if (!ctx) {
    throw new Error('useModal debe usarse dentro de ModalProvider');
  }
  return ctx;
}

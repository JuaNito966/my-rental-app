import React from 'react';
import { ModalProvider } from './contexts/ModalContext';
import Modal from './components/Modal/Modal';
import AppRouter from './routes/AppRouter';
import Header from './components/Header/Header';

export default function App() {
  return (
    <ModalProvider>
      <Header />
      <Modal />
      <AppRouter />
    </ModalProvider>
  );
}

// src/routes/AppRouter.jsx
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import Home    from '../pages/Home/Home';
import Cart    from '../pages/Cart/Cart';
import Rental from '../pages/Rental/Rental';
import RentalHistory from '../pages/RentalHistory/RentalHistory';

export default function AppRouter() {
  return (
    <Routes>
      {/* Ruta principal: listado de productos */}
      <Route path="/" element={<Home />} />
      
      {/* Listado de productos agregados al carrito */}
      <Route path="/cart" element={<Cart />} />

      {/* Formulario de alquiler */}
      <Route path="/rental" element={<Rental />} />

      {/* Ver los productos alquilados */}
      <Route path="/rentals" element={<RentalHistory />} />

      {/* Atrapa cualquier otra ruta y redirige al home */}
      <Route path="*" element={<Navigate to="/" replace />} />


    </Routes>
  );
}

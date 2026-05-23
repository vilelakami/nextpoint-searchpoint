import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './pages/DashboardPesquisa';
import Formulario from './pages/Formulario';

export default function App() {
  return (
    <BrowserRouter>
      <div className="flex w-full h-screen">
        <main className="flex-1 h-full flex flex-col">
          <Routes>
            <Route path="/" element={<Navigate to="/Dashboard" />} />
            <Route path="/Dashboard" element={<Dashboard />} />
            <Route path="/Formulario" element={<Formulario />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './pages/DashboardPesquisa';
import Formulario from './pages/Formulario';

export default function App() {
  return (
    <BrowserRouter>
      <div className="flex flex-col w-full h-screen">
        <main className="flex-1 h-full flex flex-col">
          <Routes>
            <Route path="/" element={<Navigate to="/Dashboard" />} />
            <Route path="/Dashboard" element={<Dashboard />} />
            <Route path="/Formulario" element={<Formulario />} />
            <Route path="/formulario/:id" element={<Formulario />} />
          </Routes>
        </main>
        <footer className="flex fixed bottom-1 left-1/2 text-sm left-1/2 -translate-x-1/2 shadow-xl">
          Powered By NextPoint
        </footer>
      </div>
    </BrowserRouter>
  );
}

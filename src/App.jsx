import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './pages/DashboardPesquisa';
import Formulario from './pages/Formulario';
import ResponderFormulario from './pages/ResponderPesquisa';

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
            <Route path="/responder/:id" element={<ResponderFormulario />} />
          </Routes>
        </main>
        <footer className="flex fixed bottom-1 text-sm right-5 text-indigo-950 font-medium shadow-xl">
          Powered By NextPoint
        </footer>
      </div>
    </BrowserRouter>
  );
}

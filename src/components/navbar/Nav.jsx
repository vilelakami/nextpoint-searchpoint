import React from 'react';
import { NavLink } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className=" px-6 py-4 flex justify-center items-center">
      {/* Container dos links com espaçamento responsivo */}
      <div className="flex items-center gap-8 md:gap-12 text-sm md:text-base font-medium">
        
        <NavLink
          to="/Dashboard"
          className="text-sm text-white font-normal relative pb-2 hover:border-b-2 border-white active:border-b-2 active:font-bold"
        >
          Dashboard
        </NavLink>

        <NavLink
          to="/Arquivados"
          className="text-sm text-white font-normal relative pb-2 hover:border-b-2 border-white"
        >
          Arquivados
        </NavLink>
      </div>
    </nav>
  );
}
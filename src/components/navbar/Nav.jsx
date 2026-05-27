import React from 'react';
import { NavLink } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="px-2 md:px-6 py-3 md:py-4 flex justify-center items-center">
      {/* links da navbar */}
      <div className="flex items-center gap-4 md:gap-8 lg:gap-12 text-xs md:text-sm lg:text-base font-medium">
        <NavLink
          to="/Dashboard"
          className="text-xs md:text-sm text-white font-normal relative pb-2 hover:border-b-2 border-white active:border-b-2 active:font-bold transition-colors whitespace-nowrap"
        >
          Dashboard
        </NavLink>

        <NavLink
          to="/Arquivados"
          className="text-xs md:text-sm text-white font-normal relative pb-2 hover:border-b-2 border-white transition-colors whitespace-nowrap"
        >
          Gráficos
        </NavLink>
      </div>
    </nav>
  );
}

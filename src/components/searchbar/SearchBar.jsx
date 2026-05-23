import React from 'react';
import { Search } from 'lucide-react';

export default function SearchBar({ busca, setBusca }) {
  return (
    <div className="relative flex items-center bg-gray-200 border border-slate-200 rounded-xl px-3 py-2 w-full max-w-md shadow-2xs focus-within:border-indigo-700 focus-within:ring-1 focus-within:ring-indigo-700 transition-all group">
      
      {/* Ícone da Lupa da Lucide */}
      <Search className="size-4 text-slate-400 shrink-0 group-focus-within:text-indigo-700 transition-colors" />
      
      {/* Input de Texto Invisível por baixo */}
      <input
        type="text"
        placeholder="Buscar pesquisa..."
        value={busca}
        onChange={(e) => setBusca(e.target.value)}
        className="w-full text-sm pl-2 bg-transparent text-slate-700 placeholder-slate-400 outline-hidden border-0"
      />
      
    </div>
  );
}
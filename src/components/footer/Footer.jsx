import React from 'react';
import { CirclePlus, RemoveFormatting } from 'lucide-react';

export default function Footer({ onAdicionarPergunta, onAdicionarTitulo }) {
  return (
    <div className="flex items-center justify-between sm:justify-start gap-3 md:gap-4 lg:gap-5 bg-slate-900 w-[calc(100%-2rem)] sm:w-fit py-2.5 md:py-3 px-4 sm:px-5 lg:px-6 rounded-2xl fixed bottom-8 md:bottom-8 left-1/2 -translate-x-1/2 z-50 shadow-xl border border-slate-800">
      
      {/* btn pergunta */}
      <button
        type="button"
        onClick={onAdicionarPergunta}
        className="flex flex-1 sm:flex-none items-center justify-center sm:justify-start gap-2 text-white hover:text-indigo-400 font-medium text-xs md:text-sm border-r border-slate-700 pr-3 md:pr-4 lg:pr-5 transition-colors"
      >
        <CirclePlus className="size-4 md:size-5" />
        <span className="hidden sm:inline">Pergunta</span>
        <span className="sm:hidden text-sm font-bold">Pergunta</span> 
      </button>

      {/* btn titulo */}
      <button
        type="button"
        onClick={onAdicionarTitulo}
        className="flex flex-1 sm:flex-none items-center justify-center sm:justify-start gap-2 text-white hover:text-indigo-400 font-medium text-xs md:text-sm transition-colors"
      >
        <RemoveFormatting className="size-4 md:size-5" />
        <span className="hidden sm:inline">Título</span>
        <span className="sm:hidden text-sm font-bold">Título</span> 
      </button>
      
    </div>
  );
}
import React from 'react';

export default function ConfiguracaoPergunta() {
  return (
    <div className="absolute top-12 md:top-14 lg:top-16 right-3 md:right-4 lg:right-6 w-64 flex flex-col bg-white rounded-xl p-4 md:p-5 gap-3 shadow-xl border border-slate-200/60 z-50">
      
      <p className="text-slate-400 text-[10px] md:text-xs font-bold tracking-wider uppercase">
        Configurações
      </p>
      
      <div className="flex flex-col gap-3.5">
        {/* Opção: Obrigatória */}
        <label className="flex items-center justify-between cursor-pointer text-sm font-medium text-slate-700 select-none group">
          <span className="group-hover:text-slate-900 transition-colors">Obrigatória</span>
          <input type="checkbox" className="sr-only peer" />
          <div className="relative w-10 h-6 bg-slate-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600 transition-colors"></div>
        </label>

        {/* Opção: Ordem Aleatória */}
        <label className="flex items-center justify-between cursor-pointer text-sm font-medium text-slate-700 select-none group">
          <span className="group-hover:text-slate-900 transition-colors">Ordem Aleatória</span>
          <input type="checkbox" className="sr-only peer" />
          <div className="relative w-10 h-6 bg-slate-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600 transition-colors"></div>
        </label>
      </div>

    </div>
  );
}
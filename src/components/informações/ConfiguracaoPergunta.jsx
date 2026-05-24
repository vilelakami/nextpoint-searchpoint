import React from 'react';

export default function ConfiguracaoPergunta() {
  return (
    <div className="absolute top-15 right-10 w-fit flex flex-col bg-white rounded-lg p-4 gap-2">
      <p className="text-slate-500 text-xs font-medium">CONFIGURAÇÕES</p>
      <div>
        <label className="flex items-center justify-between cursor-pointer text-xs font-medium">
          Obrigatória
          <input type="checkbox" value="" className="sr-only peer" />
          <div class="relative w-9 h-5 bg-slate-500 peer-focus:outline-none peer-focus:ring-0 peer-focus:ring-brand-soft dark:peer-focus:ring-brand-soft rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-buffer after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-indigo-700"></div>
        </label>
      </div>
      <div>
        <label className="flex items-center justify-between gap-8 cursor-pointer text-xs font-medium">
          Ordem Aleatória
          <input type="checkbox" value="" className="sr-only peer" />
          <div class="relative w-9 h-5 bg-slate-500 peer-focus:outline-none peer-focus:ring-0 peer-focus:ring-brand-soft dark:peer-focus:ring-brand-soft rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-buffer after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-indigo-700"></div>
        </label>
      </div>
    </div>
  );
}

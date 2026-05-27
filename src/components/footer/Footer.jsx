import React, { useRef } from 'react';
import { CirclePlus, Image, RemoveFormatting } from 'lucide-react';

export default function Footer({ onAdicionarPergunta, onAdicionarTitulo, onAdicionarMidia }) {
  const inputMidiaRef = useRef(null);

  return (
    <div className="flex items-center justify-between sm:justify-start gap-3 md:gap-4 lg:gap-5 bg-slate-900 w-[calc(100%-2rem)] sm:w-fit py-2.5 md:py-3 px-4 sm:px-5 lg:px-6 rounded-2xl fixed bottom-8 md:bottom-8 left-1/2 -translate-x-1/2 z-50 shadow-xl border border-slate-800">
      
      {/* Botão Pergunta */}
      <button
        type="button"
        onClick={onAdicionarPergunta}
        className="flex flex-1 sm:flex-none items-center justify-center sm:justify-start gap-2 text-white hover:text-indigo-400 font-medium text-xs md:text-sm border-r border-slate-700 pr-3 md:pr-4 lg:pr-5 transition-colors"
      >
        <CirclePlus className="size-4 md:size-5" />
        <span className="hidden sm:inline">Pergunta</span>
        <span className="sm:hidden text-sm font-bold">Pergunta</span> 
      </button>

      {/* Botão Título */}
      <button
        type="button"
        onClick={onAdicionarTitulo}
        className="flex flex-1 sm:flex-none items-center justify-center sm:justify-start gap-2 text-white hover:text-indigo-400 font-medium text-xs md:text-sm border-r border-slate-700 pr-3 md:pr-4 lg:pr-5 transition-colors"
      >
        <RemoveFormatting className="size-4 md:size-5" />
        <span className="hidden sm:inline">Título</span>
        <span className="sm:hidden text-sm font-bold">Título</span> 
      </button>

      {/* Botão Mídia (Aciona o input de arquivo oculto) */}
      <button 
        type="button"
        onClick={() => inputMidiaRef.current?.click()}
        className="flex flex-1 sm:flex-none items-center justify-center sm:justify-start gap-2 text-white hover:text-indigo-400 font-medium text-xs md:text-sm transition-colors pl-1 sm:pl-0"
      >
        <Image className="size-4 md:size-5" />
        <span>Mídia</span>
      </button>

      {/* Input de Arquivo invisível gerenciado pelo botão Mídia */}
      <input 
        type="file"
        ref={inputMidiaRef}
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          const arquivo = e.target.files?.[0];
          if (arquivo) {
            onAdicionarMidia(arquivo);
            e.target.value = ''; // Reseta o input para permitir subir a mesma foto em seguida
          }
        }}
      />
      
    </div>
  );
}
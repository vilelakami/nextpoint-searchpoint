import React from 'react';
import { FileText, MoreVertical } from 'lucide-react';

import { statusStyles, status } from '../../utils/dados';

// 1. Uma paleta de cores
const PALETA_CORES = [
  'bg-pink-400', // Rosa
  'bg-teal-400', // Verde água
  'bg-purple-600', // Roxo
  'bg-amber-500', // Laranja / Amarelo
  'bg-red-500', // Vermelho
  'bg-lime-500', // Verde alface
];

export default function CardForm({ pesquisa, onClick }) {
  const statusParaTeste = 'concluida';

  // 2. Sorteia uma cor da paleta toda vez que o card nasce na tela
  const corAleatoria =
    PALETA_CORES[Math.floor(Math.random() * PALETA_CORES.length)];

  return (
    <div onClick={onClick} className="bg-white rounded-lg md:rounded-2xl shadow-sm border border-slate-100 overflow-hidden flex flex-col h-full">
      {/* Banner Superior com Cor Aleatória */}
      <div className={`h-20 md:h-24 lg:h-28 w-full ${corAleatoria}`} />

      {/* Corpo do Card */}
      <div className="p-3 md:p-4 lg:p-5 flex flex-col flex-grow justify-between gap-3 md:gap-4">
        {/* Título e Botão de Opções */}
        <div>
          <div className="flex justify-between items-start gap-2 mb-1 md:mb-2">
            <h3 className="text-base md:text-lg lg:text-xl font-bold text-slate-800 line-clamp-2 leading-tight">
              {pesquisa.titulo || 'Sem título'}
            </h3>
            <button className="text-slate-400 hover:text-slate-600 p-0.5 md:p-1 rounded-full hover:bg-slate-50 transition-colors shrink-0">
              <MoreVertical className="w-4 h-4 md:w-5 md:h-5" />
            </button>
          </div>

          {/* Descrição */}
          <p className="text-xs md:text-sm text-slate-500 line-clamp-2">
            {pesquisa.descricao || 'Sem descrição informada...'}
          </p>
        </div>

        {/* Rodapé do Card */}
        <div className="flex justify-between items-center mt-1 md:mt-2">
          {/* Contador de Perguntas */}
          <div className="flex items-center gap-1 md:gap-1.5 text-slate-600 text-xs font-semibold">
            <FileText className="w-3 h-3 md:w-4 md:h-4 text-slate-400 shrink-0" />
            <span className="truncate">{pesquisa.perguntas ? pesquisa.perguntas.lenght : 0} perguntas</span>
          </div>

          {/* Badge de Status */}
          <span
            className={`text-[8px] md:text-[10px] tracking-wider font-bold px-2 md:px-2.5 py-0.5 md:py-1 rounded-md uppercase shrink-0 ${statusStyles[typeof pesquisa?.status === 'string' ? pesquisa.status.toLowerCase() : 'em_pausa'] || statusStyles.rascunho}`}
          >
            {typeof pesquisa.status === 'string' ? pesquisa.status : 'Em Pausa'}
          </span>
        </div>
      </div>
    </div>
  );
}

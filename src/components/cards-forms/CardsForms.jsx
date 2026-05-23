import React from 'react';
import { FileText, MoreVertical } from 'lucide-react';

import {statusStyles, status} from '../../utils/dados';

// 1. Uma paleta de cores 
const PALETA_CORES = [
  'bg-pink-400',   // Rosa
  'bg-teal-400',   // Verde água
  'bg-purple-600', // Roxo
  'bg-amber-500',  // Laranja / Amarelo
  'bg-red-500',    // Vermelho
  'bg-lime-500'    // Verde alface
];

export default function CardForm({ titulo, descricao, qtdPerguntas, status }) {
    const statusParaTeste = "concluida";
  
  // 2. Sorteia uma cor da paleta toda vez que o card nasce na tela
  const corAleatoria = PALETA_CORES[Math.floor(Math.random() * PALETA_CORES.length)];

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden flex flex-col h-full">
      
      {/* Banner Superior com Cor Aleatória */}
      <div className={`h-28 w-full ${corAleatoria}`} />

      {/* Corpo do Card */}
      <div className="p-5 flex flex-col flex-grow justify-between gap-4">
        
        {/* Título e Botão de Opções */}
        <div>
          <div className="flex justify-between items-start gap-2 mb-2">
            <h3 className="text-xl font-bold text-slate-800 line-clamp-2 leading-tight">
              Formulário de Satisfação do Cliente
            </h3>
            <button className="text-slate-400 hover:text-slate-600 p-1 rounded-full hover:bg-slate-50 transition-colors">
              <MoreVertical className="w-5 h-5" />
            </button>
          </div>

          {/* Descrição */}
          <p className="text-sm text-slate-500 line-clamp-2">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias iusto exercitationem impedit nesciunt eligendi, ea architecto itaque iure iste placeat doloribus laboriosam aperiam dolore blanditiis quibusdam repudiandae minus, eum quo!
            Quaerat dicta consequuntur, rem quos, id, eligendi fugiat iure sit voluptate soluta esse beatae reiciendis at atque officia. Nemo, alias! Sint dolore a incidunt architecto expedita ducimus consectetur minima tempore.
            Praesentium aperiam voluptate quis voluptatibus incidunt soluta velit labore quae architecto dolorum repellendus, nemo est saepe, repellat ipsum nisi laboriosam perspiciatis similique? Alias iusto asperiores placeat hic accusantium voluptate atque!
            Adipisci provident aliquam voluptatibus nihil ea numquam commodi eius corrupti ullam. Aspernatur cupiditate assumenda delectus tempora harum, fugiat, corrupti rerum quidem quae consequuntur, dignissimos eum beatae alias ea a doloribus.
            Maiores asperiores blanditiis cumque aliquid omnis tempora tenetur quas adipisci itaque, illum vel. Voluptate facere error vitae ducimus maiores, odit culpa soluta ea aliquam harum, molestias exercitationem omnis! Neque, nulla!
          </p>
        </div>

        {/* Rodapé do Card */}
        <div className="flex justify-between items-center mt-2">
          {/* Contador de Perguntas */}
          <div className="flex items-center gap-1.5 text-slate-600 text-xs font-semibold">
            <FileText className="w-4 h-4 text-slate-400" />
            <span>18 Perguntas</span>
          </div>

          {/* Badge de Status */}
          <span className={`text-[10px] tracking-wider font-bold px-2.5 py-1 rounded-md uppercase ${statusStyles[status?.toLowerCase()] || statusStyles.rascunho}`}>
            {statusParaTeste}
          </span>
        </div>

      </div>
    </div>
  );
}
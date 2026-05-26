import React, { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom'; // 👈 IMPORTANTE: Adicione esta importação!
import {
  FileText,
  MoreVertical,
  Play,
  Trash2,
  FilePieChart,
} from 'lucide-react';

import { statusStyles, status } from '../../utils/dados';

const PALETA_CORES = [
  'bg-pink-400',
  'bg-teal-400',
  'bg-purple-600',
  'bg-amber-500',
  'bg-red-500',
  'bg-lime-500',
];

export default function CardForm({ pesquisa, onClick, onExcluir }) {
  const [menuAberto, setMenuAberto] = useState(false);
  const [coordenadas, setCoordenadas] = useState({ top: 0, left: 0 }); // Guarda a posição do clique
  const buttonRef = useRef(null);
  const menuRef = useRef(null);

  const corAleatoriaRef = useRef(
    PALETA_CORES[Math.floor(Math.random() * PALETA_CORES.length)],
  );

  // Calcula a posição exata na tela onde o menu deve abrir antes de ser teletransportado
  const abrirMenu = (e) => {
    e.stopPropagation();
    if (buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      // Define a posição logo abaixo do botão de 3 pontinhos, considerando o scroll da tela
      setCoordenadas({
        top: rect.bottom + window.scrollY,
        left: rect.left + window.scrollX - 160,
      });
    }
    setMenuAberto(!menuAberto);
  };

  useEffect(() => {
    function clicarFora(event) {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target) &&
        !buttonRef.current.contains(event.target)
      ) {
        setMenuAberto(false);
      }
    }
    document.addEventListener('mousedown', clicarFora);
    return () => document.removeEventListener('mousedown', clicarFora);
  }, []);

  return (
    <div
      onClick={onClick}
      className="bg-white rounded-lg md:rounded-2xl shadow-sm border border-slate-100 overflow-hidden flex flex-col h-full cursor-pointer hover:shadow-md transition-shadow relative"
    >
      {/* Banner Superior */}
      <div
        className={`h-20 md:h-24 lg:h-28 w-full ${corAleatoriaRef.current}`}
      />

      {/* Corpo do Card */}
      <div className="p-3 md:p-4 lg:p-5 flex flex-col flex-grow justify-between gap-3 md:gap-4">
        <div>
          <div className="flex justify-between items-start gap-2 mb-1 md:mb-2">
            <h3 className="text-base md:text-lg lg:text-xl font-bold text-slate-800 line-clamp-2 leading-tight">
              {pesquisa.titulo || 'Sem título'}
            </h3>

            {/* Botão comreferência (ref) */}
            <button
              ref={buttonRef}
              type="button"
              onClick={abrirMenu}
              className="text-slate-400 hover:text-slate-600 p-0.5 md:p-1 rounded-full hover:bg-slate-50 transition-colors shrink-0"
            >
              <MoreVertical className="w-4 h-4 md:w-5 md:h-5" />
            </button>
          </div>

          <p className="text-xs md:text-sm text-slate-500 line-clamp-2 mt-1">
            {pesquisa.descricao || 'Sem descrição informada...'}
          </p>
        </div>

        {/* Rodapé do Card */}
        <div className="flex justify-between items-center mt-1 md:mt-2">
          <div className="flex items-center gap-1 md:gap-1.5 text-slate-600 text-xs font-semibold">
            <FileText className="w-3 h-3 md:w-4 md:h-4 text-slate-400 shrink-0" />
            <span className="truncate">
              {pesquisa.perguntas ? pesquisa.perguntas.length : 0} perguntas
            </span>
          </div>

          <span
            className={`text-[8px] md:text-[10px] tracking-wider font-bold px-2 md:px-2.5 py-0.5 md:py-1 rounded-md uppercase shrink-0 ${
              statusStyles[
                typeof pesquisa?.status === 'string'
                  ? pesquisa.status.toLowerCase()
                  : 'em_pausa'
              ] || statusStyles.rascunho
            }`}
          >
            {pesquisa?.status === 'em_pausa'
              ? 'Em Pausa'
              : pesquisa?.status || 'Em Pausa'}
          </span>
        </div>
      </div>

      {/* Se o menu está aberto, ele é renderizado fora do card */}
      {menuAberto &&
        createPortal(
          <div
            ref={menuRef}
            style={{
              position: 'absolute',
              top: `${coordenadas.top}px`,
              left: `${coordenadas.left}px`,
            }}
            className="w-48 bg-white border border-slate-200 rounded-xl shadow-2xl z-50 py-1.5 animate-in fade-in zoom-in-95 duration-100"
          >
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setMenuAberto(false);
                alert(`Iniciando pesquisa: ${pesquisa.titulo}`);
              }}
              className="w-full flex items-center gap-2.5 px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 text-left font-medium"
            >
              <Play size={16} className="text-emerald-500" />
              Iniciar pesquisa
            </button>

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setMenuAberto(false);
                alert(`Emitindo relatório de: ${pesquisa.titulo}`);
              }}
              className="w-full flex items-center gap-2.5 px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 text-left font-medium"
            >
              <FilePieChart size={16} className="text-indigo-500" />
              Emitir relatório
            </button>

            <hr className="border-slate-100 my-1" />

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setMenuAberto(false);
                if (
                  window.confirm(
                    `Tem certeza que deseja excluir a pesquisa "${pesquisa.titulo}"?`,
                  )
                ) {
                  if (onExcluir) onExcluir(pesquisa.id_pesquisa);
                }
              }}
              className="w-full flex items-center gap-2.5 px-4 py-2 text-sm text-red-600 hover:bg-red-50 text-left font-semibold"
            >
              <Trash2 size={16} className="text-red-600 shrink-0" />
              <span>Excluir pesquisa</span>
            </button>
          </div>,
          document.body, //
        )}
    </div>
  );
}

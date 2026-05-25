import React, { useState, useEffect } from 'react';
import { ArrowLeft, Pencil } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Pergunta from '../components/questão/Pergunta';
import Footer from '../components/footer/Footer';
import DadosPessoais from '../components/dados-pessoais/DadosPessoais';

import { ajustarAltura } from '../utils/dados';
import ConfiguracaoPergunta from '../components/informações/ConfiguracaoPergunta';

export default function Formulario() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col w-full mx-auto h-screen font-montserrat">
      <div className="relative w-full flex flex-col h-auto min-h-[28vh] lg:h-[33vh] bg-indigo-500">
        {/* cabeçalho */}
        <div className="w-full flex items-center justify-between h-auto min-h-[50px] lg:h-[62px] bg-indigo-700 p-3 md:p-4 gap-2 md:gap-4">
          <button
            onClick={() => navigate('/dashboard')}
            type="button"
            className="flex items-center gap-2 bg-transparent text-white hover:border-b-2 border-gray-300/20 font-medium ml-2 md:ml-4 text-xs md:text-sm lg:text-base whitespace-nowrap"
          >
            <ArrowLeft className="w-4 h-4 md:size-5 text-white shrink-0" />
            <span className="hidden md:inline">Novo Formulário</span>
            <span className="md:hidden">Voltar</span>
          </button>
          <div className="flex items-center gap-2 md:gap-4 mr-2 md:mr-4">
            <button
              onClick={() => navigate('/Dashboard')}
              type="button"
              className="bg-transparent text-white hover:text-gray-200 font-medium text-xs md:text-sm px-2 md:px-3 py-1"
            >
              Cancelar
            </button>
            <button
              type="button"
              className="bg-white text-indigo-700 hover:bg-gray-200 font-medium text-xs md:text-sm py-1 px-3 md:px-6 rounded"
            >
              Enviar
            </button>
          </div>
        </div>
        <ConfiguracaoPergunta />

        {/* formulário */}
        <div className="w-full max-w-4xl mx-auto px-3 md:px-4 lg:px-8 pb-6 md:pb-12 flex-grow flex flex-col">
          {/* folha (forms) */}
          <div className="w-full bg-gray-100 rounded-lg md:rounded-xl shadow-lg border border-slate-200/60 min-h-[400px] md:min-h-[500px] mt-3 md:mt-5 relative z-10 flex flex-col">
            {/* Conteúdo de dentro do Formulário */}
            <div className="p-4 md:p-6 lg:p-8 flex flex-col gap-4 md:gap-6 overflow-y-auto">
              <div className="flex flex-col gap-3">
                {/* Título Principal Auto-Expansível */}
                {/* Alterado para items-start para manter o lápis alinhado no topo quando quebrar linha */}
                <div className="flex items-start justify-between gap-4 border-b border-transparent hover:border-slate-200/60 focus-within:border-indigo-500 transition-colors group">
                  <textarea
                    rows={1}
                    onInput={ajustarAltura}
                    className="flex-grow bg-transparent placeholder:text-black text-black font-semibold text-3xl md:text-4xl py-1 focus:outline-none resize-none break-words overflow-hidden h-auto min-h-[44px] md:min-h-[52px]"
                    placeholder="Formulário"
                  />
                  <button
                    type="button"
                    className="shrink-0 text-slate-400 group-hover:text-black transition-colors mt-2 md:mt-3"
                  >
                    <Pencil className="w-4 h-4 md:size-5" />
                  </button>
                </div>

                {/* Descrição Principal Auto-Expansível */}
                <div className="flex items-start justify-between gap-4 border-b border-transparent hover:border-slate-200/60 focus-within:border-indigo-500 transition-colors group">
                  <textarea
                    rows={1}
                    onInput={ajustarAltura}
                    className="flex-grow bg-transparent placeholder:text-slate-500 text-slate-600 font-normal text-sm md:text-base py-1 focus:outline-none resize-none break-words overflow-hidden h-auto min-h-[28px] md:min-h-[32px]"
                    placeholder="Descrição"
                  />
                  <button
                    type="button"
                    className="shrink-0 text-slate-400 group-hover:text-black transition-colors mt-1.5"
                  >
                    <Pencil className="w-3 h-3 md:size-4 lg:size-5" />
                  </button>
                </div>
              </div>

              {/* id da pesquisa */}
              <div className="flex items-center border-b border-transparent hover:border-slate-200/60 focus-within:border-indigo-500 transition-colors group w-fit">
                <textarea
                  rows={1}
                  onInput={ajustarAltura}
                  className="w-40 bg-transparent placeholder:text-slate-500 text-slate-600 font-normal text-sm md:text-base py-1 focus:outline-none resize-none break-words overflow-hidden h-auto min-h-[28px] md:min-h-[32px]"
                  placeholder="nº de registro"
                />
                <button
                  type="button"
                  className="shrink-0 text-slate-400 group-hover:text-black transition-colors mt-1"
                >
                  <Pencil className="w-2 h-2 md:size-3 lg:size-4" />
                </button>
              </div>
              <hr className="border-slate-200/40" />
              <DadosPessoais/>
              <Pergunta />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

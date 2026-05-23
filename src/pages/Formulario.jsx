import React from 'react';
import { ArrowLeft, Pencil, ImageDown, CircleDot } from 'lucide-react';
import { Navigate, useNavigate } from 'react-router-dom';

export default function Formulario() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col w-full mx-auto h-screen">
      <div className="w-full flex flex-col h-auto min-h-[28vh] lg:h-[33vh] bg-indigo-500">
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
        {/* formulário */}
        <div className="w-full max-w-4xl mx-auto px-3 md:px-4 lg:px-8 pb-6 md:pb-12 flex-grow flex flex-col">
          {/* folha (forms) */}
          <div className="w-full bg-white rounded-lg md:rounded-xl shadow-lg border border-slate-200/60 min-h-[400px] md:min-h-[500px] mt-3 md:mt-5 relative z-10 flex flex-col">
            {/* Conteúdo de dentro do Formulário */}
            <div className="p-4 md:p-6 lg:p-8 flex flex-col gap-4 md:gap-6 overflow-y-auto">
              <div>
                <div className="flex items-start md:items-center gap-3 md:gap-5 mb-2 md:mb-3">
                  <h2 className="text-lg md:text-xl lg:text-2xl font-bold text-slate-800 flex-wrap">
                    Título do Formulário
                  </h2>
                  <button type="button" className="shrink-0">
                    <Pencil className="w-4 h-4 md:size-5" />
                  </button>
                </div>
                <div className="flex items-start md:items-center gap-2 md:gap-3">
                  <p className="text-xs md:text-sm text-slate-400">
                    Descrição ou instruções para o preenchimento das perguntas.
                  </p>
                  <button type="button" className="shrink-0">
                    <Pencil className="w-3 h-3 md:size-4" />
                  </button>
                </div>
              </div>

              <hr className="border-slate-100" />

              {/* Exemplo de Campo de Pergunta */}
              <div className="flex flex-col gap-2 md:gap-3">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 md:gap-4">
                  <div className="flex items-center gap-2 md:gap-3">
                    <label className="text-xs md:text-sm font-semibold text-slate-700">
                      Título
                    </label>
                    <Pencil className="w-3 h-3 md:size-3 shrink-0" />
                  </div>
                  <div className="flex items-center gap-3 md:gap-5">
                    <ImageDown className="w-3 h-3 md:size-4 shrink-0" />
                    <button
                      type="button"
                      className="flex items-center gap-2 bg-gray-200 py-1 md:py-2 px-3 md:px-4 rounded-lg text-xs md:text-sm whitespace-nowrap"
                    >
                      <CircleDot className="w-3 h-3 md:size-4 shrink-0" />
                      <span className="hidden md:inline">Selecione</span>
                      <span className="md:hidden">Sel.</span>
                    </button>
                  </div>
                </div>
                <input
                  type="text"
                  placeholder="Digite sua resposta aqui..."
                  className="w-full border border-slate-200 rounded-lg p-2 md:p-3 text-xs md:text-sm focus:outline-none focus:border-[#4F46E5] bg-slate-50/50"
                />
              </div>

              <div className="flex flex-col gap-2 md:gap-3">
                <label className="text-xs md:text-sm font-semibold text-slate-700">
                  Descrição detalhada
                </label>
                <textarea
                  rows={3}
                  placeholder="Conte-nos um pouco mais..."
                  className="w-full border border-slate-200 rounded-lg p-2 md:p-3 text-xs md:text-sm focus:outline-none focus:border-[#4F46E5] bg-slate-50/50 resize-none"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

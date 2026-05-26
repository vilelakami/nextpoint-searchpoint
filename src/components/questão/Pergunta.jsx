import React, { useState, useEffect } from 'react';
import { ImageDown, CircleDot, Pencil, Plus, Trash } from 'lucide-react';

import { ajustarAltura } from '../../utils/dados';

export default function Pergunta({ dados, atualizarPergunta, adicionarOpcao }) {
  const [tipoPergunta, setTipoPergunta] = useState('multipla_escolha');

  return (
    <div className="bg-white p-6 rounded-xl flex flex-col gap-4 shadow-sm font-montserrat">
      {/* Linha do Topo: Inputs na esquerda, Ações na direita */}
      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
        {/* BLOCO DA ESQUERDA: Título e Descrição */}
        <div className="flex flex-col gap-2 flex-grow max-w-2xl w-full">
          {/* Textarea de Título auto-expansível */}
          <div className="flex items-start gap-2 group border-b border-transparent hover:border-slate-100 focus-within:border-indigo-500 transition-colors">
            <textarea
              value={dados.titulo}
              onChange={(e) =>
                atualizarPergunta(dados.id, 'titulo', e.target.value)
              }
              rows={1}
              onInput={ajustarAltura} // Dispara a função toda vez que o usuário digitar ou quebrar linha
              className="flex-grow bg-transparent placeholder:text-black text-black font-semibold text-lg py-1 focus:outline-none resize-none break-words overflow-hidden h-auto min-h-[36px]"
              placeholder="Título"
            />
            <Pencil className="size-4 text-slate-400 shrink-0 opacity-40 group-hover:opacity-100 transition-opacity mt-2" />
          </div>

          {/* Textarea de Descrição auto-expansível */}
          <div className="flex items-start gap-2 group border-b border-transparent hover:border-slate-100 focus-within:border-indigo-500 transition-colors">
            <textarea
              value={dados.descricao}
              onChange={(e) =>
                atualizarPergunta(dados.id, 'descricao', e.target.value)
              }
              rows={1}
              onInput={ajustarAltura} // Dispara a função aqui também
              className="flex-grow bg-transparent placeholder:text-slate-400 text-slate-600 font-normal text-sm py-1 focus:outline-none resize-none break-words overflow-hidden h-auto min-h-[28px]"
              placeholder="Descrição"
            />
            <Pencil className="size-4 text-slate-400 shrink-0 opacity-40 group-hover:opacity-100 transition-opacity mt-1.5" />
          </div>
        </div>

        {/* BLOCO DA DIREITA: Ícone de imagem e Select */}
        <div className="flex items-center justify-end gap-3 md:gap-4 shrink-0">
          <label className="text-slate-400 hover:text-slate-600 p-2 rounded-lg hover:bg-slate-50 transition-colors cursor-pointer">
            <ImageDown className="size-5" />

            {/* O input real fica aqui dentro, mas invisível debaixo do ícone */}
            <input
              type="file"
              accept="image/*" // Aceita apenas arquivos de imagem
              className="hidden" // Esconde o visual padrão feio do sistema operacional
              onChange={(e) => {
                const arquivo = e.target.files[0]; // Pega o primeiro arquivo selecionado
                if (arquivo) {
                  // Avisa o pai enviando o ID da pergunta, o campo 'imagem' e o arquivo
                  atualizarPergunta(dados.id, 'imagem', arquivo);
                }
              }}
            />
          </label>

          <div className="flex items-center gap-2 bg-slate-100 px-3 py-2 rounded-xl border border-transparent focus-within:border-slate-300 transition-all">
            <CircleDot className="size-4 text-slate-600" />
            <select
              value={dados.tipo}
              onChange={(e) =>
                atualizarPergunta(dados.id, 'tipo', e.target.value)
              }
              id="tipos_perguntas"
              className="block w-full bg-transparent bg-gray-200 text-sm rounded border-0 outline-none border-none focus:outline-none focus:ring-0 focus:border-transparent focus-visible:outline-none focus-visible:ring-0 focus-visible:border-transparent focus:shadow-none cursor-pointer"
            >
              <option value="multipla_escolha">Múltipla Escolha</option>
              <option value="texto">Texto</option>
            </select>
          </div>
          <div>
            <label className="flex items-center gap-2 cursor-pointer text-sm font-medium text-slate-700 select-none group">
              <span className="group-hover:text-slate-900 transition-colors">
                Obrigatória
              </span>
              <input
                type="checkbox"
                className="sr-only peer"
                checked={dados.obrigatoria}
                onChange={(e) =>
                  atualizarPergunta(dados.id, 'obrigatoria', e.target.checked)
                }
              />
              <div className="relative w-10 h-6 bg-slate-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600 transition-colors"></div>
            </label>
          </div>
          <div>
            <Trash className="size-4 hover:text-red-600" />
          </div>
        </div>
      </div>

      {/* Condicional: Conteúdo da Múltipla Escolha */}
      {dados.tipo === 'multipla_escolha' && (
        <div className="flex flex-col gap-3 mt-2 pl-1 animate-in fade-in duration-150">
          {/* Opção 1 auto-expansível */}
          {dados.opcoes.map((opcao, indexOpcao) => (
            <div
              key={indexOpcao}
              className="flex items-start gap-3 group max-w-md w-full"
            >
              <input
                type="radio"
                disabled
                className="accent-[#4F46E5] size-4 cursor-not-allowed mt-2"
              />
              <textarea
                rows={1}
                onInput={ajustarAltura}
                value={opcao}
                onChange={(e) => {
                  const novasOpcoes = [...dados.opcoes];
                  novasOpcoes[indexOpcao] = e.target.value;
                  atualizarPergunta(dados.id, 'opcoes', novasOpcoes);
                }}
                className="flex-grow bg-transparent border-b border-transparent hover:border-slate-200 focus:border-[#4F46E5] text-slate-800 font-normal text-sm py-1 focus:outline-none resize-none break-words overflow-hidden h-auto min-h-[28px]"
                placeholder="Opção 1"
              />
            </div>
          ))}

          {/* Botão Adicionar Opção */}
          <button
            type="button"
            onClick={() => adicionarOpcao(dados.id)}
            className="max-w-fit flex items-center gap-2 text-slate-500 hover:text-[#4F46E5] font-medium text-sm py-1 transition-colors group"
          >
            <Plus className="size-4 md:size-5 text-slate-400 group-hover:text-[#4F46E5] transition-colors" />
            <span>Adicionar opção</span>
          </button>
        </div>
      )}

      {/* Condicional: Campo de resposta para Texto */}
      {dados.tipo === 'texto' && (
        <div className="mt-2 animate-in fade-in duration-150">
          <input
            type="text"
            disabled
            placeholder="Texto de resposta curta"
            className="w-full max-w-xl border-b border-dashed border-slate-200 text-sm py-2 bg-transparent text-slate-400 cursor-not-allowed"
          />
        </div>
      )}
    </div>
  );
}

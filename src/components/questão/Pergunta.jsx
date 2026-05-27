import React, { useState } from 'react';
// importação dos ícones
import {
  ImageDown,
  CircleDot,
  Pencil,
  Plus,
  Trash,
  Trash2,
} from 'lucide-react';

// importação dos dados
import { ajustarAltura } from '../../utils/dados';

export default function Pergunta({
  dados,
  atualizarPergunta,
  adicionarOpcao,
  onExcluirPergunta,
}) {
  const [editandoCabecalho, setEditandoCabecalho] = useState(false);

  return (
    <div className="bg-white p-6 rounded-xl flex flex-col gap-4 shadow-sm font-montserrat relative w-full">
      {/* Linha do Topo: Inputs na esquerda, Ações na direita */}
      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4 w-full">
        
        {/* titulo e descricao da pergunta */}
        <div className="flex flex-col gap-2 flex-grow w-full">
          
          {/* Textarea de Título auto-expansível */}
          <div className="flex items-start gap-2 group border-b border-transparent hover:border-slate-100 focus-within:border-indigo-500 transition-colors relative w-full">
            {/* se a questão for "obrigatória" adiciona um * vermelho */}
            {dados.obrigatoria && (
              <span className="ml-1 mt-1 text-red-500 font-bold text-lg select-none absolute -left-4 top-1">
                *
              </span>
            )}

            <textarea
              value={dados.titulo}
              onChange={(e) =>
                atualizarPergunta(dados.id, 'titulo', e.target.value)
              }
              rows={1}
              onInput={ajustarAltura}
              className="flex-grow bg-transparent placeholder:text-black text-black font-semibold text-lg py-1 focus:outline-none resize-none break-words overflow-hidden h-auto min-h-[36px]"
              placeholder="Título"
              disabled={!editandoCabecalho}
              onBlur={() => setEditandoCabecalho(false)}
            />
            <button
              type="button"
              onMouseDown={(e) => {
                e.preventDefault(); 
                setEditandoCabecalho(!editandoCabecalho);
              }}
            >
              <Pencil className="size-4 text-slate-400 shrink-0 opacity-40 group-hover:opacity-100 transition-opacity mt-2" />
            </button>
          </div>

          {/* descrição */}
          <div className="flex items-start gap-2 group border-b border-transparent hover:border-slate-100 focus-within:border-indigo-500 transition-colors w-full">
            <textarea
              value={dados.descricao}
              onChange={(e) =>
                atualizarPergunta(dados.id, 'descricao', e.target.value)
              }
              rows={1}
              onInput={ajustarAltura}
              className="w-full flex-1 bg-transparent placeholder:text-slate-400 text-slate-600 font-normal text-sm py-1 focus:outline-none resize-none break-words overflow-hidden h-auto min-h-[28px]"
              placeholder="Descrição"
              disabled={!editandoCabecalho}
              onBlur={() => setEditandoCabecalho(false)}
            />

            <button
              type="button"
              onMouseDown={(e) => {
                e.preventDefault();
                setEditandoCabecalho(!editandoCabecalho);
              }}
              className="shrink-0"
            >
              <Pencil className="size-4 text-slate-400 shrink-0 opacity-40 group-hover:opacity-100 transition-opacity mt-1.5" />
            </button>
          </div>
        </div>

        {/* imagem, toggle de obrigatoria, tipo da pergunta e lixeira */}
        <div className="flex items-center justify-end gap-3 md:gap-4 shrink-0 lg:mt-1">
          {/* btn add imagem */}
          <label className="text-slate-400 hover:text-slate-600 p-2 rounded-lg hover:bg-slate-50 transition-colors cursor-pointer">
            <ImageDown className="size-5" />
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                const arquivo = e.target.files[0];
                if (arquivo) {
                  atualizarPergunta(dados.id, 'imagem', arquivo);
                }
              }}
            />
          </label>

          {/* Select de Tipo de Pergunta */}
          <div className="flex items-center gap-2 bg-slate-100 px-3 py-2 rounded-xl border border-transparent focus-within:border-slate-300 transition-all">
            <CircleDot className="size-4 text-slate-600" />
            <select
              value={dados.tipo}
              onChange={(e) =>
                atualizarPergunta(dados.id, 'tipo', e.target.value)
              }
              id="tipos_perguntas"
              className="block w-full bg-transparent text-sm rounded border-0 outline-none border-none focus:outline-none focus:ring-0 focus:border-transparent focus-visible:outline-none focus-visible:ring-0 focus-visible:border-transparent focus:shadow-none cursor-pointer py-0"
            >
              <option value="multipla_escolha">Múltipla Escolha</option>
              <option value="texto">Texto</option>
            </select>
          </div>

          {/* Toggle de Obrigatoriedade */}
          <div>
            <label className="flex items-center gap-2 cursor-pointer text-sm font-medium text-slate-700 select-none group">
              <span className="group-hover:text-slate-900 transition-colors">
                Obrigatória
              </span>
              <input
                type="checkbox"
                className="sr-only peer"
                checked={dados.obrigatoria || false}
                onChange={(e) =>
                  atualizarPergunta(dados.id, 'obrigatoria', e.target.checked)
                }
              />
              <div className="relative w-10 h-6 bg-slate-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600 transition-colors"></div>
            </label>
          </div>

          {/* btn de excluir bloco de pergunta */}
          <button
            type="button"
            onClick={() => onExcluirPergunta(dados.id)}
            className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            title="Excluir pergunta"
          >
            <Trash2 className="size-5" />
          </button>
        </div>
      </div>

      {/* exibindo a img dps da descficao e do titulo */}
      {dados.imagem && (
        <div className="relative my-2 max-w-md rounded-lg overflow-hidden border border-slate-200 group self-start">
          <img
            src={URL.createObjectURL(dados.imagem)}
            alt="Upload da pergunta"
            className="w-full h-auto object-cover max-h-64"
          />
          <button
            type="button"
            onClick={() => atualizarPergunta(dados.id, 'imagem', null)}
            className="absolute top-2 right-2 bg-black/70 hover:bg-black text-white p-1.5 rounded-full transition-colors"
            title="Remover imagem"
          >
            <Trash className="size-4" />
          </button>
        </div>
      )}

      {/* condicional, se for multipla escolha aparece as opções, se nao, o textarea */}
      {dados.tipo === 'multipla_escolha' && (
        <div className="flex flex-col gap-3 mt-2 pl-1 animate-in fade-in duration-150 w-full">
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
                placeholder={`Opção ${indexOpcao + 1}`}
              />
            </div>
          ))}

          {/* btn add opção */}
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

      {/* add textarea */}
      {dados.tipo === 'texto' && (
        <div className="mt-2 animate-in fade-in duration-150 w-full">
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
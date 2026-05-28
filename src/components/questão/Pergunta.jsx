import React, { useState } from 'react';
// importação dos ícones
import { CircleDot, Pencil, Plus, Trash2 } from 'lucide-react';
// importando dados e funções auxiliares
import { ajustarAltura } from '../../utils/dados';

export default function Pergunta({
  dados,
  atualizarPergunta,
  adicionarOpcao,
  onExcluirPergunta,
}) {
  const [editandoPergunta, setEditandoPergunta] = useState(false);

  return (
    <div className="bg-white p-4 rounded-xl flex flex-col gap-4 shadow-sm relative w-full border border-slate-100">
      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4 w-full">
        {/* Titulo e Descricao da Pergunta */}
        <div className="flex flex-col gap-2 flex-grow w-full">
          {/* Textarea de Título com Feedback visual do Lápis */}
          <div className="flex items-center gap-2 group relative w-full">
            {dados.obrigatoria && (
              <span className=" text-red-500 font-bold text-lg select-none absolute -left-1.5 top-2.5">
                *
              </span>
            )}
            {/* campo do título */}
            <textarea
              value={dados.titulo}
              onChange={(e) =>
                atualizarPergunta(dados.id, 'titulo', e.target.value)
              }
              rows={1}
              onInput={ajustarAltura}
              className={`flex-grow p-2 rounded-xl text-black font-semibold text-lg py-1 focus:outline-none resize-none break-words overflow-hidden h-auto min-h-[36px] transition-all ${
                editandoPergunta
                  ? 'bg-white border-2 border-indigo-500 shadow-sm ring-4 ring-indigo-50 text-slate-900'
                  : 'bg-transparent border-2 border-transparent text-black'
              }`}
              placeholder="Título da pergunta"
              disabled={!editandoPergunta}
            />
            <button
              type="button"
              onClick={() => setEditandoPergunta(!editandoPergunta)}
            >
              <Pencil className={`size-4 shrink-0 transition-colors mt-2 ${editandoPergunta ? 'text-indigo-600' : 'text-slate-400'}`} />
            </button>
          </div>

          {/* descrição */}
          <div className="flex items-center gap-2 group w-full">
            <textarea
              value={dados.descricao}
              onChange={(e) =>
                atualizarPergunta(dados.id, 'descricao', e.target.value)
              }
              rows={1}
              onInput={ajustarAltura}
              className={`w-full flex-1 p-2 rounded-xl text-slate-600 font-normal text-sm py-1 focus:outline-none resize-none break-words overflow-hidden h-auto min-h-[28px] transition-all ${
                editandoPergunta
                  ? 'bg-white border-2 border-indigo-500 shadow-sm ring-4 ring-indigo-50 text-slate-900'
                  : 'bg-transparent border-2 border-transparent text-slate-500'
              }`}
              placeholder="Descrição ou orientação (opcional)"
              disabled={!editandoPergunta}
            />
            <button
              type="button"
              onClick={() => setEditandoPergunta(!editandoPergunta)}
              className="shrink-0"
            >
              <Pencil className={`size-4 shrink-0 transition-colors mt-1.5 ${editandoPergunta ? 'text-indigo-600' : 'text-slate-400'}`} />
            </button>
          </div>
        </div>

        {/* Controles de tipo, obrigatoriedade e lixeira */}
        <div className="flex items-center justify-end gap-3 md:gap-4 shrink-0 lg:mt-1">
          {/* Select de Tipo de Pergunta - multipla resposta/uma resposta */}
          <div className="flex items-center gap-2 bg-slate-100 px-3 py-2 rounded-xl border border-transparent focus-within:border-slate-300 transition-all">
            <CircleDot className="size-4 text-slate-600" />
            <select
              value={dados.tipo}
              onChange={(e) =>
                atualizarPergunta(dados.id, 'tipo', e.target.value)
              }
              id="tipos_perguntas"
              className="block w-full bg-transparent text-sm rounded border-0 outline-none border-none focus:outline-none focus:ring-0 focus:border-transparent cursor-pointer py-0"
            >
              <option value="multipla_escolha">Múltipla Escolha - Uma resposta</option>
              <option value="caixa_selecao">Múltipla Escolha - Múltipla Resposta</option>
              <option value="texto">Texto Livre</option>
            </select>
          </div>

          {/* toggle de questão obrigatória */}
          <div>
            <label className="flex items-center gap-2 cursor-pointer text-sm font-medium text-slate-700 select-none group">
              <span className="group-hover:text-slate-900 transition-colors">
                Obrigatória
              </span>
              <button
                type="button"
                onClick={() => atualizarPergunta(dados.id, 'obrigatoria', !dados.obrigatoria)}
                className={`w-11 h-6 flex items-center rounded-full p-0.5 transition-colors duration-300 outline-none ${
                  dados.obrigatoria ? 'bg-indigo-600' : 'bg-slate-300'
                }`}
              >
                <div
                  className={`bg-white w-5 h-5 rounded-full shadow-md transform transition-transform duration-300 ${
                    dados.obrigatoria ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </label>
          </div>

          {/* btn excluir bloco de pergunta */}
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

      {/* Condicional de Respostas baseadas no tipo selecionado */}
      {(dados.tipo === 'multipla_escolha' || dados.tipo === 'caixa_selecao') && (
        <div className="flex flex-col gap-3 mt-2 pl-1 animate-in fade-in duration-150 w-full">
          {dados.opcoes.map((opcao, indexOpcao) => (
            <div
              key={indexOpcao}
              className="ml-1.5 flex items-center gap-3 group max-w-md w-full"
            >
              <input
                type={dados.tipo === 'caixa_selecao' ? 'checkbox' : 'radio'}
                disabled
                className="accent-[#4F46E5] size-4 cursor-not-allowed"
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
                placeholder={`Opção de resposta ${indexOpcao + 1}`}
              />
            </div>
          ))}

          {/* Botão adicionar opção */}
          <button
            type="button"
            onClick={() => adicionarOpcao(dados.id)}
            className="max-w-fit flex items-center gap-2 text-slate-500 hover:text-[#4F46E5] font-medium text-sm py-1 transition-colors group"
          >
            <Plus className="size-4 md:size-5 text-slate-400 group-hover:text-[#4F46E5] transition-colors" />
            <span>Adicionar Opção</span>
          </button>
        </div>
      )}

      {/* Tipo Texto livre */}
      {dados.tipo === 'texto' && (
        <div className="mt-2 animate-in fade-in duration-150 w-full">
          <input
            type="text"
            disabled
            placeholder="Campo de texto para resposta curta..."
            className="w-full max-w-xl border-b border-dashed border-slate-200 text-sm py-2 bg-transparent text-slate-400 cursor-not-allowed focus:outline-none"
          />
        </div>
      )}
    </div>
  );
}
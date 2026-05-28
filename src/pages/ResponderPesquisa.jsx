import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
// importação dos ícones
import { ArrowLeft } from 'lucide-react';
// importação das páginas
import DadosPessoais from '../components/dados-pessoais/DadosPessoais';

// Importação do serviço unificado
import { pesquisaService } from '../pages/services/PesquisaService';

export default function ResponderPesquisa() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [pesquisa, setPesquisa] = useState(null);
  const [respostas, setRespostas] = useState({});

  useEffect(() => {
    if (id) {
      const pesquisasSalvas = JSON.parse(localStorage.getItem('pesquisas')) || [];
      const achada = pesquisasSalvas.find(p => p.id_pesquisa === id);
      if (achada) {
        setPesquisa(achada);
      }
    }
  }, [id]);

  const handleMudarResposta = (perguntaId, valorOpcao, tipoPergunta) => {
    if (tipoPergunta === 'caixa_selecao') {
      const respostaAtual = respostas[perguntaId];
      const arrayAtual = Array.isArray(respostaAtual) ? respostaAtual : [];
      
      if (arrayAtual.includes(valorOpcao)) {
        setRespostas({
          ...respostas,
          [perguntaId]: arrayAtual.filter(item => item !== valorOpcao)
        });
      } else {
        setRespostas({
          ...respostas,
          [perguntaId]: [...arrayAtual, valorOpcao]
        });
      }
    } else {
      setRespostas({
        ...respostas,
        [perguntaId]: valorOpcao
      });
    }
  };

  // validações de status
  const handlePersistirRespostas = (statusFinal = 'concluida') => {
    if (statusFinal === 'concluida') {
      const obrigatoriasVazias = pesquisaService.validarPerguntasObrigatorias(pesquisa.perguntas, respostas);

      if (obrigatoriasVazias.length > 0) {
        alert("Atenção! Não é possível finalizar a pesquisa. Existem perguntas OBRIGATÓRIAS que não foram respondidas.");
        return;
      }
    }

    pesquisaService.salvarFichaColeta(id, pesquisa.titulo, respostas, statusFinal);

    alert(statusFinal === 'em_pausa' ? 'Progresso salvo como Em Pausa!' : 'Pesquisa finalizada com sucesso!');
    navigate('/dashboard');
  };

  if (!pesquisa) {
    return <div className="p-8 text-center text-sm font-medium text-slate-400">Carregando dados da pesquisa...</div>;
  }

  return (
    <div className="flex flex-col w-full mx-auto min-h-screen bg-slate-50">
      {/* cabeçalho */}
      <div className="w-full flex items-center justify-between h-[62px] bg-indigo-700 p-4 shrink-0 shadow-md">
        <button
          onClick={() => navigate('/dashboard')}
          type="button"
          className="flex items-center gap-2 bg-transparent text-white hover:border-b-2 border-gray-300/20 font-medium ml-2 md:ml-4 text-xs md:text-sm lg:text-base whitespace-nowrap"
        >
          <ArrowLeft className="w-5 h-5 text-white" />
          <span>Voltar ao Dashboard</span>
        </button>
        <div className="flex items-center gap-2 md:gap-4 mr-2 md:mr-4">
          {/* ações */}
          <button
            onClick={() => navigate('/dashboard')}
            type="button"
            className="bg-transparent text-white hover:text-gray-200 font-medium text-xs md:text-sm px-2 md:px-3 py-1"
          >
            Cancelar
          </button>
          <button
            onClick={() => handlePersistirRespostas('em_pausa')}
            type="button"
            className="bg-transparent text-white hover:text-gray-200 font-medium text-xs md:text-sm px-2 md:px-3 py-1"
          >
            Pausar
          </button>
          <button
            onClick={() => handlePersistirRespostas('concluida')}
            type="button"
            className="bg-white text-indigo-700 hover:bg-gray-200 font-medium text-xs md:text-sm py-1 px-5 rounded-lg shadow-sm"
          >
            Finalizar
          </button>
        </div>
      </div>

      {/* área do forms em formato de resposta */}
      <div className="flex-grow w-full max-w-3xl mx-auto px-4 py-6 flex flex-col gap-6">
        
        {/* titulo do forms */}
        <div className="w-full bg-white rounded-xl shadow-sm border border-slate-200 p-6 flex flex-col gap-2">
          <h1 className="text-3xl font-bold text-slate-900 break-words">{pesquisa.titulo || 'Formulário Sem Título'}</h1>
          {pesquisa.descricao && <p className="text-slate-500 font-normal text-sm break-words">{pesquisa.descricao}</p>}
          <div className="text-xs text-slate-400 font-mono mt-2">Registro nº: {pesquisa.id_pesquisa}</div>
        </div>

        {/* Adicionado container flexível para os campos internos não espremerem */}
        <div className="w-full bg-white rounded-xl shadow-sm border border-slate-200 p-4 input-dados-pessoais-full">
          <DadosPessoais />
        </div>

        {/* mapeando os enunciados das perguntas */}
        <div className="flex flex-col gap-4">
          {pesquisa.perguntas?.map((pergunta, index) => {
            if (pergunta.tipo_bloco === 'titulo_bloco') {
              return (
                <div key={pergunta.id || index} className="border-l-4 border-indigo-500 bg-white p-5 rounded-xl border border-slate-200 shadow-sm mt-2">
                  <h2 className="text-xl font-bold text-slate-800 break-words">{pergunta.titulo || 'Seção Sem Título'}</h2>
                  {pergunta.descricao && <p className="text-sm text-slate-400 mt-1 break-words">{pergunta.descricao}</p>}
                </div>
              );
            }

            return (
              <div key={pergunta.id || index} className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col gap-4">
                {/* titulo da questão */}
                <div className="flex items-start gap-2 flex-wrap">
                  <h3 className="text-base md:text-lg font-bold text-slate-800 break-words">
                    {index + 1}. {pergunta.titulo || pergunta.texto || 'Pergunta sem enunciado'}
                  </h3>
                  {pergunta.obrigatoria && (
                    <span className="text-[10px] font-bold text-red-600 bg-red-50 border border-red-100 px-2 py-0.5 rounded-md uppercase tracking-wider select-none">
                      OBRIGATÓRIA *
                    </span>
                  )}
                </div>

                {/* descrição */}
                {pergunta.descricao && (
                  <p className="text-xs text-slate-400 -mt-2 italic break-words">{pergunta.descricao}</p>
                )}

                {/* Inputs baseados no Tipo - multipla escolha, escolha unica e textp */}
                <div className="w-full">
                  {pergunta.tipo === 'texto' ? (
                    <input
                      type="text"
                      value={respostas[pergunta.id] || ''}
                      onChange={(e) => setRespostas({ ...respostas, [pergunta.id]: e.target.value })}
                      placeholder="Digite sua resposta aqui..."
                      className="w-full max-w-2xl border-b-2 border-slate-200 focus:border-indigo-500 text-sm py-2 bg-transparent text-slate-800 focus:outline-none transition-colors"
                    />
                  ) : (
                    <div className="flex flex-col gap-2">
                      {pergunta.opcoes?.map((opcao, indexOpcao) => {
                        const isChecked = pergunta.tipo === 'caixa_selecao'
                          ? (Array.isArray(respostas[pergunta.id]) && respostas[pergunta.id].includes(opcao))
                          : (respostas[pergunta.id] === opcao);

                        return (
                          <label
                            key={indexOpcao}
                            className="flex items-center gap-3 p-3 rounded-xl border border-slate-100 hover:bg-slate-50 cursor-pointer group transition-colors"
                          >
                            <input
                              type={pergunta.tipo === 'caixa_selecao' ? 'checkbox' : 'radio'}
                              name={`grupo-pergunta-exclusivo-${pergunta.id}`}
                              checked={!!isChecked}
                              onChange={() => handleMudarResposta(pergunta.id, opcao, pergunta.tipo)}
                              className="accent-indigo-600 size-4 cursor-pointer"
                            />
                            <span className="text-sm text-slate-700 group-hover:text-slate-900 transition-colors break-words">
                              {opcao || `Opção de resposta ${indexOpcao + 1}`}
                            </span>
                          </label>
                        );
                      })}
                    </div>
                  )}
                </div>

              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
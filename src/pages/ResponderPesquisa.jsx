import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import DadosPessoais from '../components/dados-pessoais/DadosPessoais'; 

export default function ResponderFormulario() {
  const { id } = useParams();
  const navigate = useNavigate();
  
  // Estado para guardar os dados da pesquisa que veio do localStorage
  const [pesquisa, setPesquisa] = useState(null);
  
  // Estado para salvar as respostas que o usuário vai marcar
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

  // Função para salvar a resposta digitada ou selecionada 
  const handleMudarResposta = (perguntaId, valor) => {
    setRespostas({
      ...respostas,
      [perguntaId]: valor
    });
  };

  const handleSalvarRespostas = () => {
    console.log("Respostas coletadas:", respostas);
    alert("Pesquisa respondida com sucesso!");
    navigate('/Dashboard');
  };

  if (!pesquisa) {
    return <div className="p-8 text-center">Carregando formulário...</div>;
  }

  return (
    <div className="flex flex-col w-full mx-auto h-screen font-montserrat bg-slate-50">
      {/* Cabeçalho Limpo */}
      <div className="w-full flex items-center justify-between h-[62px] bg-indigo-700 p-4 shrink-0">
        <button
          onClick={() => navigate('/Dashboard')}
          type="button"
          className="flex items-center gap-2 bg-transparent text-white hover:border-b-2 border-gray-300/20 font-medium ml-2 md:ml-4 text-xs md:text-sm lg:text-base whitespace-nowrap"
        >
          <ArrowLeft className="w-5 h-5 text-white" />
          <span>Voltar ao Dashboard</span>
        </button>
        <div className='flex items-center gap-5'>
        <button
          onClick={navigate('/')}
          type="button"
          className="bg-transparent text-white hover:text-gray-200 font-medium text-xs md:text-sm px-2 md:px-3 py-1"
        >
          Cancelar
        </button>
        <button
          onClick={handleSalvarRespostas}
          type="button"
          className="bg-white text-indigo-700 hover:bg-gray-200 font-medium text-xs md:text-sm py-1 px-3 md:px-6 rounded"
        >
          Pausar
        </button>
        <button
          onClick={handleSalvarRespostas}
          type="button"
          className="bg-white text-indigo-700 hover:bg-gray-200 font-medium text-xs md:text-sm py-1 px-3 md:px-6 rounded"
        >
          Finalizar
        </button>
        </div>
      </div>

      {/* Área do Formulário */}
      <div className="flex-grow overflow-y-auto w-full max-w-4xl mx-auto px-4 py-6 md:py-10">
        
        {/* Bloco Principal: Título e registro da pesquisa */}
        <div className="w-full bg-white rounded-xl shadow-md border border-slate-200 p-6 md:p-8 flex flex-col gap-4 mb-6">
          <h1 className="text-3xl font-bold text-slate-900 break-words">
            {pesquisa.titulo || 'Formulário Sem Título'}
          </h1>
          {pesquisa.descricao && (
            <p className="text-slate-600 font-normal text-sm md:text-base break-words">
              {pesquisa.descricao}
            </p>
          )}
          <div className="text-xs text-slate-400 font-mono">
            Registro nº: {pesquisa.id_pesquisa}
          </div>
        </div>

        {/* dadso do entrevistado */}
        <div className="w-full bg-white rounded-xl shadow-md border border-slate-200 p-6 mb-6">
          <DadosPessoais />
        </div>

        {/* perguntas = apenas resposta */}
        <div className="flex flex-col gap-6 pb-12">
          {pesquisa.perguntas?.map((pergunta, index) => (
            <div key={pergunta.id || index} className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col gap-4">
              
              {/* Cabeçalho da questão*/}
              <div>
                <h3 className="text-base md:text-lg font-bold text-slate-800 break-words">
                  {index + 1}. {pergunta.titulo || 'Pergunta sem enunciado'}
                  {pergunta.obrigatoria && <span className="text-red-500 ml-1">*</span>}
                </h3>
                {pergunta.descricao && (
                  <p className="text-xs text-slate-500 mt-1 break-words">{pergunta.descricao}</p>
                )}
              </div>

              {/* Renderização Condicional das Respostas */}
              {pergunta.tipo === 'texto' ? (
                // Se for campo de TEXTO: Renderiza um input livre para escrita
                <div className="mt-2">
                  <input
                    type="text"
                    value={respostas[pergunta.id] || ''}
                    onChange={(e) => handleMudarResposta(pergunta.id, e.target.value)}
                    placeholder="Digite sua resposta aqui..."
                    className="w-full max-w-2xl border-b-2 border-slate-200 focus:border-indigo-500 text-sm py-2 bg-transparent text-slate-800 focus:outline-none transition-colors"
                  />
                </div>
              ) : (
                // Se for MÚLTIPLA ESCOLHA: Renderiza a lista de radio buttons clicáveis
                <div className="flex flex-col gap-3 mt-2 pl-1">
                  {pergunta.opcoes?.map((opcao, indexOpcao) => (
                    <label 
                      key={indexOpcao} 
                      className="flex items-center gap-3 max-w-md w-full cursor-pointer group"
                    >
                      <input
                        type="radio"
                        name={`pergunta-${pergunta.id}`}
                        checked={respostas[pergunta.id] === opcao}
                        onChange={() => handleMudarResposta(pergunta.id, opcao)}
                        className="accent-indigo-600 size-4 cursor-pointer"
                      />
                      <span className="text-sm text-slate-700 group-hover:text-slate-900 transition-colors break-words">
                        {opcao || `Opção ${indexOpcao + 1}`}
                      </span>
                    </label>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
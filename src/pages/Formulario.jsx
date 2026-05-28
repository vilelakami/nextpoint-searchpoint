import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
// importação dos ícones
import { ArrowLeft, Pencil, Trash2 } from 'lucide-react';

// Importação do serviço unificado
import { pesquisaService } from '../pages/services/PesquisaService';

// importação das páginas
import Pergunta from '../components/questão/Pergunta';
import Footer from '../components/footer/Footer';
import DadosPessoais from '../components/dados-pessoais/DadosPessoais';
import ConfiguracaoPergunta from '../components/informações/ConfiguracaoPergunta';
import { ajustarAltura } from '../utils/dados';

export default function Formulario() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [campoEditando, setCampoEditando] = useState(null);

  const [dadosFormulario, setDadosFormulario] = useState(() =>
    pesquisaService.generateFormularioVazio ? pesquisaService.generateFormularioVazio() : pesquisaService.gerarFormularioVazio(),
  );

  useEffect(() => {
    if (id) {
      const pesquisaEncontrada = pesquisaService.buscarPorId(id);
      if (pesquisaEncontrada) {
        setDadosFormulario(pesquisaEncontrada);
      }
    }
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDadosFormulario({ ...dadosFormulario, [name]: value });
  };

  const atualizarPergunta = (idPergunta, campo, novoValor) => {
    setDadosFormulario((prev) => ({
      ...prev,
      perguntas: prev.perguntas.map((p) =>
        p.id === idPergunta ? { ...p, [campo]: novoValor } : p,
      ),
    }));
  };

  const onAdicionarOpcao = (perguntaId) => {
    setDadosFormulario((prev) => ({
      ...prev,
      perguntas: prev.perguntas.map((p) =>
        p.id === perguntaId ? { ...p, opcoes: [...p.opcoes, ''] } : p,
      ),
    }));
  };

  const onExcluirPergunta = (idPergunta) => {
    setDadosFormulario((prev) => ({
      ...prev,
      perguntas: prev.perguntas.filter((p) => p.id !== idPergunta),
    }));
  };

  const adicionarNovaPergunta = () => {
    const novaQuestao = pesquisaService.criarNovaPerguntaEstrutura();
    setDadosFormulario((prev) => ({
      ...prev,
      perguntas: [...prev.perguntas, novaQuestao],
    }));
  };

  const adicionarNovoTitulo = () => {
    const novoBlocoTitulo = pesquisaService.criarNovoTituloEstrutura();
    setDadosFormulario((prev) => ({
      ...prev,
      perguntas: [...prev.perguntas, novoBlocoTitulo],
    }));
  };

  // validações ao salvar
  const handleSalvarFluxo = (statusAlvo) => {
    if (!dadosFormulario.titulo.trim()) {
      alert("Por favor, defina pelo menos um título para a pesquisa antes de salvar.");
      return;
    }
    if (!dadosFormulario.id_pesquisa) {
      alert("O Número de Registro é obrigatório.");
      return;
    }

    const sucesso = pesquisaService.salvarEstruturaFormulario(dadosFormulario, statusAlvo);
    if (sucesso) {
      alert(statusAlvo === 'rascunho' 
        ? 'Rascunho salvo com sucesso!' 
        : 'Pesquisa publicada com sucesso! Formulário em andamento.'
      );
      navigate('/Dashboard');
    }
  };

  return (
    <div className="flex flex-col w-full mx-auto h-screen font-montserrat bg-slate-100">
      <div className="relative w-full flex flex-col h-auto min-h-[28vh] lg:h-[33vh] bg-indigo-500">
       {/* cabeçalho */}
        <div className="w-full flex items-center justify-between h-auto min-h-[50px] lg:h-[62px] bg-indigo-700 p-3 md:p-4 gap-2 md:gap-4 shadow-md">
          <button onClick={() => navigate('/dashboard')} type="button" className="flex items-center gap-2 bg-transparent text-white hover:border-b-2 border-gray-300/20 font-medium ml-2 md:ml-4 text-xs md:text-sm lg:text-base whitespace-nowrap">
            <ArrowLeft className="w-4 h-4 md:size-5 text-white shrink-0" />
            <span className="hidden md:inline">Novo Formulário</span>
          </button>
          {/* ações */}
          <div className="flex items-center gap-2 md:gap-4 mr-2 md:mr-4">
            <button onClick={() => navigate('/Dashboard')} type="button" className="bg-transparent text-white hover:text-gray-200 font-medium text-xs md:text-sm px-2 md:px-3 py-1">Cancelar</button>
            <button onClick={() => handleSalvarFluxo('rascunho')} type="button" className="bg-transparent text-white hover:text-gray-200 font-medium text-xs md:text-sm px-2 md:px-3 py-1">Salvar Rascunho</button>
            <button onClick={() => handleSalvarFluxo('pronta')} type="button" className="bg-white text-indigo-700 hover:bg-gray-200 font-medium text-xs md:text-sm py-1 px-3 md:px-6 rounded transition-colors shadow-sm">Criar Pesquisa</button>
          </div>
        </div>

        {/* modal para transf todas as questões em obrigatórias */}
        <ConfiguracaoPergunta />

        <div className="w-full max-w-4xl mx-auto px-3 md:px-4 lg:px-8 pb-32 flex-grow flex flex-col">
          <div className="w-full bg-white rounded-lg md:rounded-xl shadow-lg border border-slate-200 min-h-[400px] md:min-h-[500px] mt-3 md:mt-5 relative z-10 flex flex-col">
            {/* header do forms: titulo, descrição e nº de registro */}
            <div className="p-4 md:p-6 lg:p-8 flex flex-col gap-4 md:gap-6 overflow-y-auto">
              {/* titulo do formulario */}
              <div className="flex flex-col gap-3">
                <div className={`flex items-start justify-between gap-4 border-b transition-all rounded-xl p-1 group ${campoEditando === 'titulo' ? 'bg-white border-indigo-500 shadow-sm ring-2 ring-indigo-100' : 'border-transparent hover:border-slate-200/60'}`}>
                  <textarea
                    name="titulo"
                    value={dadosFormulario.titulo}
                    onChange={handleInputChange}
                    rows={1}
                    onInput={ajustarAltura}
                    className="flex-grow bg-transparent placeholder:text-slate-400 text-black font-semibold text-3xl md:text-4xl py-1 focus:outline-none resize-none break-words whitespace-pre-wrap overflow-hidden h-auto min-h-[44px] md:min-h-[52px]"
                    placeholder="Formulário sem título"
                    disabled={campoEditando !== 'titulo'}
                    onBlur={() => setCampoEditando(null)}
                  />
                  <button type="button" onClick={() => setCampoEditando('titulo')} className={`shrink-0 transition-colors mt-2 md:mt-3 ${campoEditando === 'titulo' ? 'text-indigo-600' : 'text-slate-400 group-hover:text-black'}`}>
                    <Pencil className="w-4 h-4 md:size-5" />
                  </button>
                </div>

                {/* descrição */}
                <div className={`flex items-start justify-between gap-4 border-b transition-all rounded-xl p-1 group ${campoEditando === 'descricao' ? 'bg-white border-indigo-500 shadow-sm ring-2 ring-indigo-100' : 'border-transparent hover:border-slate-200/60'}`}>
                  <textarea
                    name="descricao"
                    value={dadosFormulario.descricao}
                    onChange={handleInputChange}
                    rows={1}
                    onInput={ajustarAltura}
                    className="flex-grow bg-transparent placeholder:text-slate-500 text-slate-600 font-normal text-sm md:text-base py-1 focus:outline-none resize-none break-words overflow-hidden h-auto min-h-[28px] md:min-h-[32px]"
                    placeholder="Descrição do formulário"
                    disabled={campoEditando !== 'descricao'}
                    onBlur={() => setCampoEditando(null)}
                  />
                  <button type="button" onClick={() => setCampoEditando('descricao')} className={`shrink-0 transition-colors mt-1.5 ${campoEditando === 'descricao' ? 'text-indigo-600' : 'text-slate-400 group-hover:text-black'}`}>
                    <Pencil className="w-3 h-3 md:size-4" />
                  </button>
                </div>
              </div>

              {/* nº de registro */}
              <div className={`flex items-center border-b transition-all rounded-xl p-1 group w-fit ${campoEditando === 'id' ? 'bg-white border-indigo-500 shadow-sm ring-2 ring-indigo-100' : 'border-transparent hover:border-slate-200/60'}`}>
                <input
                  name="id_pesquisa"
                  type="text"
                  required
                  inputMode="numeric"
                  placeholder="Nº de Registro *"
                  value={dadosFormulario.id_pesquisa || ''}
                  onChange={(e) => {
                    const apenasNumeros = e.target.value.replace(/\D/g, '');
                    setDadosFormulario({ ...dadosFormulario, id_pesquisa: apenasNumeros });
                  }}
                  className="w-40 bg-transparent placeholder:text-slate-500 text-slate-600 font-normal text-sm md:text-base py-1 focus:outline-none"
                  disabled={campoEditando !== 'id'}
                  onBlur={() => setCampoEditando(null)}
                />
                <button type="button" onClick={() => setCampoEditando('id')} className={`shrink-0 transition-colors mt-1 ${campoEditando === 'id' ? 'text-indigo-600' : 'text-slate-400 group-hover:text-black'}`}>
                  <Pencil className="w-2 h-2 md:size-3" />
                </button>
              </div>

              <hr className="border-slate-200/40" />
              {/* dados fixos de preenhcimento: dados pessoais */}
              <DadosPessoais />

              {/*adicionar titulo simples */}
              {dadosFormulario.perguntas.map((item, index) => {
                if (item.tipo_bloco === 'titulo_bloco') {
                  return (
                    <div key={item.id} className="relative group w-full py-2 px-1">
                      <input
                        type="text"
                        value={item.titulo}
                        onChange={(e) => atualizarPergunta(item.id, 'titulo', e.target.value)}
                        placeholder="Insira um título de seção..."
                        className="w-full bg-transparent font-bold text-2xl text-slate-900 outline-none border-b-2 border-transparent focus:border-indigo-500 transition-all"
                      />
                      {/* excluir titulo */}
                      <button
                        type="button"
                        onClick={() => onExcluirPergunta(item.id)}
                        className="absolute right-0 top-3 p-1 text-slate-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <Trash2 className="size-4" />
                      </button>
                    </div>
                  );
                }
                // se adicionar pergunta > add o bloco completo
                return (
                  <Pergunta
                    key={item.id || index}
                    dados={item}
                    atualizarPergunta={atualizarPergunta}
                    adicionarOpcao={onAdicionarOpcao}
                    onExcluirPergunta={onExcluirPergunta}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <Footer
        onAdicionarPergunta={adicionarNovaPergunta}
        onAdicionarTitulo={adicionarNovoTitulo}
      />
    </div>
  );
}
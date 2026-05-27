import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Pencil, Trash2 } from 'lucide-react';

// Importação do serviço unificado
import { pesquisaService } from '../pages/services/PesquisaService';

// Importação de Subcomponentes de UI
import Pergunta from '../components/questão/Pergunta';
import Footer from '../components/footer/Footer';
import DadosPessoais from '../components/dados-pessoais/DadosPessoais';
import ConfiguracaoPergunta from '../components/informações/ConfiguracaoPergunta';
import { ajustarAltura } from '../utils/dados';

export default function Formulario() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [editandoCabecalho, setEditandoCabecalho] = useState(false);
  const [idBlocoEditando, setIdBlocoEditando] = useState(null);

  // inicializando os dados de forma automatica (com função)
  const [dadosFormulario, setDadosFormulario] = useState(() =>
    pesquisaService.gerarFormularioVazio(),
  );

  // Efeito para carregar dados caso seja uma edição de formulário existente
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

  // Funções disparadas pelo painel inferior (Footer)
  const adicionarNovaPergunta = () => {
    const novaQuestao = {
      id: Date.now().toString(),
      tipo_bloco: 'pergunta',
      titulo: '',
      descricao: '',
      tipo: 'multipla_escolha',
      obrigatoria: false,
      imagem: null,
      opcoes: [''],
    };
    setDadosFormulario((prev) => ({
      ...prev,
      perguntas: [...prev.perguntas, novaQuestao],
    }));
  };

  const adicionarNovoTitulo = () => {
    const novoBlocoTitulo = {
      id: Date.now().toString(),
      tipo_bloco: 'titulo_bloco',
      titulo: '',
      descricao: '',
    };
    setDadosFormulario((prev) => ({
      ...prev,
      perguntas: [...prev.perguntas, novoBlocoTitulo],
    }));
  };

  const adicionarNovaMidia = (arquivoImagem) => {
    const novoBlocoMidia = {
      id: Date.now().toString(),
      tipo_bloco: 'midia',
      titulo: '',
      imagem: arquivoImagem,
    };
    setDadosFormulario((prev) => ({
      ...prev,
      perguntas: [...prev.perguntas, novoBlocoMidia],
    }));
  };

  // Envio e persistência local através do Service
  const handleEnviar = (e) => {
    e.preventDefault();
    const sucesso = pesquisaService.salvarFormularioCompleto(dadosFormulario);
    if (sucesso) {
      alert('Formulário salvo localmente com sucesso!');
      navigate('/Dashboard');
    }
  };

  return (
    <div className="flex flex-col w-full mx-auto h-screen font-montserrat">
      <div className="relative w-full flex flex-col h-auto min-h-[28vh] lg:h-[33vh] bg-indigo-500">
        {/* Cabeçalho da Página */}
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
              onClick={handleEnviar}
              type="button"
              className="bg-white text-indigo-700 hover:bg-gray-200 font-medium text-xs md:text-sm py-1 px-3 md:px-6 rounded"
            >
              Enviar
            </button>
          </div>
        </div>

        <ConfiguracaoPergunta />

        {/* Corpo do Editor de Formulários */}
        <div className="w-full max-w-4xl mx-auto px-3 md:px-4 lg:px-8 pb-32 flex-grow flex flex-col">
          <div className="w-full bg-gray-100 rounded-lg md:rounded-xl shadow-lg border border-slate-200/60 min-h-[400px] md:min-h-[500px] mt-3 md:mt-5 relative z-10 flex flex-col">
            <div className="p-4 md:p-6 lg:p-8 flex flex-col gap-4 md:gap-6 overflow-y-auto">
              {/* Box de Edição de Informações Base da Pesquisa */}
              <div className="flex flex-col gap-3">
                <div className="flex items-start justify-between gap-4 border-b border-transparent hover:border-slate-200/60 focus-within:border-indigo-500 transition-colors group">
                  <textarea
                    name="titulo"
                    value={dadosFormulario.titulo}
                    onChange={handleInputChange}
                    rows={1}
                    onInput={ajustarAltura}
                    className="flex-grow bg-transparent placeholder:text-black text-black font-semibold text-3xl md:text-4xl py-1 focus:outline-none resize-none break-words overflow-hidden h-auto min-h-[44px] md:min-h-[52px]"
                    placeholder="Formulário sem título"
                    disabled={!editandoCabecalho}
                    onBlur={() => setEditandoCabecalho(false)}
                  />
                  <button
                    type="button"
                    onClick={() => setEditandoCabecalho(!editandoCabecalho)}
                    className="shrink-0 text-slate-400 group-hover:text-black transition-colors mt-2 md:mt-3"
                  >
                    <Pencil className="w-4 h-4 md:size-5" />
                  </button>
                </div>

                <div className="flex items-start justify-between gap-4 border-b border-transparent hover:border-slate-200/60 focus-within:border-indigo-500 transition-colors group">
                  <textarea
                    name="descricao"
                    value={dadosFormulario.descricao}
                    onChange={handleInputChange}
                    rows={1}
                    onInput={ajustarAltura}
                    className="flex-grow bg-transparent placeholder:text-slate-500 text-slate-600 font-normal text-sm md:text-base py-1 focus:outline-none resize-none break-words overflow-hidden h-auto min-h-[28px] md:min-h-[32px]"
                    placeholder="Descrição do formulário"
                    disabled={!editandoCabecalho}
                    onBlur={() => setEditandoCabecalho(false)}
                  />
                  <button
                    type="button"
                    onClick={() => setEditandoCabecalho(!editandoCabecalho)}
                    className="shrink-0 text-slate-400 group-hover:text-black transition-colors mt-1.5"
                  >
                    <Pencil className="w-3 h-3 md:size-4" />
                  </button>
                </div>
              </div>

              {/* Registro do ID */}
              <div className="flex items-center border-b border-transparent hover:border-slate-200/60 focus-within:border-indigo-500 transition-colors group w-fit">
                <textarea
                  name="id_pesquisa"
                  value={dadosFormulario.id_pesquisa}
                  onChange={handleInputChange}
                  rows={1}
                  onInput={ajustarAltura}
                  className="w-40 bg-transparent placeholder:text-slate-500 text-slate-600 font-normal text-sm md:text-base py-1 focus:outline-none resize-none break-words overflow-hidden h-auto min-h-[28px] md:min-h-[32px]"
                  placeholder="Nº de Registro"
                  disabled={!editandoCabecalho}
                  onBlur={() => setEditandoCabecalho(false)}
                />
                <button
                  type="button"
                  onClick={() => setEditandoCabecalho(!editandoCabecalho)}
                  className="shrink-0 text-slate-400 group-hover:text-black transition-colors mt-1"
                >
                  <Pencil className="w-2 h-2 md:size-3" />
                </button>
              </div>

              <hr className="border-slate-200/40" />
              <DadosPessoais />

              {/* Loop Dinâmico dos Blocos da Pesquisa */}
              {dadosFormulario.perguntas.map((item, index) => {
                const estaEditando = idBlocoEditando === item.id;

                // 1. Bloco de Perguntas Padrão
                if (!item.tipo_bloco || item.tipo_bloco === 'pergunta') {
                  return (
                    <Pergunta
                      key={item.id || index}
                      dados={item}
                      atualizarPergunta={atualizarPergunta}
                      adicionarOpcao={onAdicionarOpcao}
                      onExcluirPergunta={onExcluirPergunta}
                    />
                  );
                }

                // Bloco Exclusivo de Título de Seção
                if (item.tipo_bloco === 'titulo_bloco') {
                  return (
                    <div
                      key={item.id}
                      className="bg-white p-6 rounded-xl flex flex-col gap-3 shadow-sm border-l-4 border-indigo-500 relative group w-full"
                    >
                      <div className="flex items-start justify-between gap-4 border-b border-transparent hover:border-slate-100 focus-within:border-indigo-500 transition-colors w-full">
                        <input
                          type="text"
                          value={item.titulo}
                          onChange={(e) =>
                            atualizarPergunta(item.id, 'titulo', e.target.value)
                          }
                          placeholder="Título da seção"
                          className="w-full bg-transparent font-semibold text-xl text-slate-800 outline-none py-1"
                          disabled={!estaEditando}
                          onBlur={() => setIdBlocoEditando(null)}
                        />
                        <button
                          type="button"
                          onClick={() =>
                            setIdBlocoEditando(estaEditando ? null : item.id)
                          }
                          className="shrink-0 text-slate-400 group-hover:text-black transition-colors mt-1"
                        >
                          <Pencil className="mr-3 size-4" />
                        </button>
                      </div>
                      <div className="flex items-start gap-2 border-b border-transparent hover:border-slate-100 focus-within:border-indigo-500 transition-colors w-full">
                        <textarea
                          value={item.descricao}
                          onChange={(e) =>
                            atualizarPergunta(
                              item.id,
                              'descricao',
                              e.target.value,
                            )
                          }
                          placeholder="Descrição da seção (opcional)"
                          rows={1}
                          onInput={ajustarAltura}
                          className="w-full bg-transparent text-sm text-slate-500 outline-none resize-none overflow-hidden py-1"
                          disabled={!estaEditando}
                          onBlur={() => setIdBlocoEditando(null)}
                        />
                      </div>
                      <div className="flex items-center justify-end w-full pt-2 border-t border-slate-50">
                        <button
                          type="button"
                          onClick={() => onExcluirPergunta(item.id)}
                          className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          <Trash2 className="size-5" />
                        </button>
                      </div>
                    </div>
                  );
                }

                // Bloco Exclusivo de Mídia / Imagem
                if (item.tipo_bloco === 'midia') {
                  return (
                    <div
                      key={item.id}
                      className="bg-white p-6 rounded-xl flex flex-col gap-3 shadow-sm border-l-4 border-indigo-500 relative group w-full"
                    >
                      <div className="flex items-start justify-between gap-4 border-b border-transparent hover:border-slate-100 focus-within:border-indigo-500 transition-colors w-full">
                        <input
                          type="text"
                          value={item.titulo}
                          onChange={(e) =>
                            atualizarPergunta(item.id, 'titulo', e.target.value)
                          }
                          placeholder="Título da imagem (opcional)"
                          className="w-full bg-transparent font-medium text-base text-slate-700 outline-none py-1"
                          disabled={!estaEditando}
                          onBlur={() => setIdBlocoEditando(null)}
                        />
                        <button
                          type="button"
                          onClick={() =>
                            setIdBlocoEditando(estaEditando ? null : item.id)
                          }
                          className="shrink-0 text-slate-400 group-hover:text-black transition-colors mt-1"
                        >
                          <Pencil className="mr-3 size-4" />
                        </button>
                      </div>
                      {item.imagem && (
                        <div className="max-w-md overflow-hidden rounded-lg border border-slate-200 mt-1 self-start">
                          <img
                            src={
                              item.imagem instanceof Blob ||
                              item.imagem instanceof File
                                ? URL.createObjectURL(item.imagem)
                                : item.imagem
                            }
                            alt="Mídia do formulário"
                            className="w-full h-auto object-cover max-h-64"
                          />
                        </div>
                      )}
                      <div className="flex items-center justify-end w-full pt-2 border-t border-slate-50">
                        <button
                          type="button"
                          onClick={() => onExcluirPergunta(item.id)}
                          className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          <Trash2 className="size-5" />
                        </button>
                      </div>
                    </div>
                  );
                }

                return null;
              })}
            </div>
          </div>
        </div>
      </div>

      <Footer
        onAdicionarPergunta={adicionarNovaPergunta}
        onAdicionarTitulo={adicionarNovoTitulo}
        onAdicionarMidia={adicionarNovaMidia}
      />
    </div>
  );
}

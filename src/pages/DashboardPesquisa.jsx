import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Settings, Plus, LogOut } from 'lucide-react';

// Importação do Serviço Centralizado
import { pesquisaService } from '../pages/services/PesquisaService';

// Importação de componentes visuais
import logotipo from '../assets/icons/logotipo.svg';
import Nav from '../components/navbar/Nav';
import Status from '../components/status/Status';
import SearchBar from '../components/searchbar/SearchBar';
import CardForm from '../components/cards-forms/CardsForms';

// TanStack Table
import { useReactTable, getCoreRowModel } from '@tanstack/react-table';

export default function DashboardPesquisa() {
  const navigate = useNavigate();
  const [bancoLocal, setBancolocal] = useState([]);
  const [busca, setBusca] = useState('');
  const [filtroStatus, setFiltroStatus] = useState('todas');

  // Carrega as pesquisas via service ao iniciar a tela
  useEffect(() => {
    setBancolocal(pesquisaService.buscarTodas());
  }, []);

  // Modifica o status mandando para o service
  const handleAlternarPausa = (idPesquisa, statusAtual) => {
    const listaAtualizada = pesquisaService.alternarPausa(
      idPesquisa,
      statusAtual,
    );
    setBancolocal(listaAtualizada);
  };

  // Remove o registro mandando para o service
  const handleExcluirPesquisa = (idPesquisa) => {
    const listaAtualizada = pesquisaService.excluir(idPesquisa);
    setBancolocal(listaAtualizada);
  };

  // Referência estável de colunas para o TanStack Table
  const colunas = useMemo(
    () => [
      { accessorKey: 'titulo' },
      { accessorKey: 'status' },
      { accessorKey: 'id_pesquisa' },
    ],
    [],
  );

  const table = useReactTable({
    data: bancoLocal,
    columns: colunas,
    getCoreRowModel: getCoreRowModel(),
  });

  // Filtra de forma performática a partir do arquivo service
  const pesquisasFiltradas = useMemo(() => {
    return pesquisaService.filtrarPesquisas(bancoLocal, busca, filtroStatus);
  }, [bancoLocal, busca, filtroStatus]);

  return (
    <div className="flex flex-col w-full mx-auto h-screen bg-slate-50">
      {/* Cabeçalho Superior e Hero */}
      <div className="w-full flex flex-col h-auto min-h-[30vh] lg:h-1/3 bg-indigo-500 shrink-0">
        <div className="w-full flex items-center justify-between h-auto min-h-[50px] lg:h-[62px] bg-indigo-700 p-3 md:p-4 gap-2 md:gap-4">
          <div className="flex items-center ml-2 md:ml-4 gap-2">
            <img src={logotipo} alt="logotipo da NextPoint" />
            <h2 className="text-white text-sm md:text-base lg:text-lg font-bold truncate">
              ResearchPoint
            </h2>
          </div>
          <Nav />
          <div className="flex items-center">
            <button
              type="button"
              onClick={() => navigate('/Admin')}
              title="Configurações"
            >
              <Settings className="w-4 h-4 md:size-5 text-white mr-2 md:mr-4 shrink-0 hover:text-black transition-colors" />
            </button>
            <button type="button" onClick={() => navigate('/')} title="Sair">
              <LogOut className="w-4 h-4 md:size-5 text-white mr-2 md:mr-4 shrink-0 hover:text-black transition-colors" />
            </button>
          </div>
        </div>

        {/* Título da Seção e Botão Nova Pesquisa */}
        <div className="w-full flex flex-col md:flex-row items-start md:items-center justify-between p-4 md:p-6 lg:p-10 gap-4 md:gap-6">
          <div className="flex flex-col gap-1 md:gap-2">
            <h1 className="text-gray-100 font-medium text-2xl md:text-3xl lg:text-4xl">
              Pesquisas
            </h1>
            <p className="text-gray-100 font-normal text-xs md:text-sm lg:text-base max-w-lg">
              Gerencie e acompanhe o desempenho de seus formulários
            </p>
          </div>
          <button
            onClick={() => navigate('/Formulario')}
            type="button"
            className="flex items-center gap-2 bg-gray-200 hover:bg-white text-indigo-700 font-semibold py-2 px-3 md:px-4 rounded text-sm md:text-base whitespace-nowrap transition-colors shadow-sm"
          >
            <Plus className="w-4 h-4 md:size-5 text-indigo-700 shrink-0" />
            <span className="hidden md:inline">Adicionar Pesquisa</span>
            <span className="md:hidden">Adicionar</span>
          </button>
        </div>
      </div>

      {/* Área de Filtros e Grid Principal */}
      <div className="flex-grow overflow-y-auto w-full max-w-6xl mx-auto px-3 md:px-6 lg:px-8 py-6 flex flex-col gap-6 md:gap-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between w-full gap-4 md:gap-6">
          <div className="w-full md:w-auto overflow-x-auto">
            <Status filtroAtual={filtroStatus} setFiltro={setFiltroStatus} />
          </div>
          <div className="w-full md:w-auto md:min-w-[250px]">
            <SearchBar busca={busca} setBusca={setBusca} />
          </div>
        </div>

        {/* Renderização dos Cards Filtrados */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5 lg:gap-6 pb-12">
          {pesquisasFiltradas.length > 0 ? (
            pesquisasFiltradas.map((pesquisa) => (
              <CardForm
                key={pesquisa.id_pesquisa}
                pesquisa={pesquisa}
                onClick={() => navigate(`/formulario/${pesquisa.id_pesquisa}`)}
                onAlternarPausa={handleAlternarPausa}
                onExcluir={handleExcluirPesquisa}
              />
            ))
          ) : (
            <div className="text-center col-span-full py-16 text-slate-400 font-medium text-sm bg-white rounded-xl border border-dashed border-slate-300">
              Nenhum formulário encontrado para os critérios filtrados.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

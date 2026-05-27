import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
// importação dos ícones
import { Settings, Plus } from 'lucide-react';
import logotipo from '../assets/icons/logotipo.svg';
// importação das páginas
import Nav from '../components/navbar/Nav';
import Status from '../components/status/Status';
import SearchBar from '../components/searchbar/SearchBar';
import CardForm from '../components/cards-forms/CardsForms';

// Importação dos componentes do Radix UI e TanStack Table
import {
  useReactTable,
  getCoreRowModel,
} from '@tanstack/react-table';

export default function DashboardPesquisa() {
  const navigate = useNavigate();
  const [bancoLocal, setBancolocal] = useState([]);
  const [busca, setBusca] = useState('');
  const [filtroStatus, setFiltroStatus] = useState('todas');

  useEffect(() => {
    const pesquisasSalvas = JSON.parse(localStorage.getItem('pesquisas')) || [];
    setBancolocal(pesquisasSalvas);
  }, []);

  // função pra mudar status
  const handleAlternarPausa = (idPesquisa, statusAtual) => {
    const novoStatus = statusAtual === 'em_pausa' ? 'rascunho' : 'em_pausa';

    const listaAtualizada = bancoLocal.map((pesquisa) => {
      if (pesquisa.id_pesquisa === idPesquisa) {
        return { ...pesquisa, status: novoStatus };
      }
      return pesquisa;
    });

    setBancolocal(listaAtualizada);
    localStorage.setItem('pesquisas', JSON.stringify(listaAtualizada));
  };

  // função pra excluir pesquisa
  const handleExcluirPesquisa = (idPesquisa) => {
    const listaFiltrada = bancoLocal.filter(
      (p) => p.id_pesquisa !== idPesquisa,
    );
    setBancolocal(listaFiltrada);
    localStorage.setItem('pesquisas', JSON.stringify(listaFiltrada));
  };

  // colunas que a biblioteca usará como referência
  const colunas = useMemo(
    () => [{ accessorKey: 'titulo' }, { accessorKey: 'status' }],
    [],
  );

  // 1. Inicializamos a TanStack Table de maneira estável e memorizada
  const table = useReactTable({
    data: bancoLocal,
    columns: colunas,
    getCoreRowModel: getCoreRowModel(),
  });

  // filtragem no search bar
  const pesquisasFiltradas = useMemo(() => {
    return bancoLocal.filter((pesquisa) => {
      // Validação 1: Busca por Texto
      const titulo = (pesquisa.titulo || '').toLowerCase();
      const bateTexto = titulo.includes(busca.toLowerCase());

      // Validação 2: Filtro por Aba de Status
      let bateStatus = false;
      if (filtroStatus === 'todas') {
        bateStatus = true;
      } else if (filtroStatus === 'em_andamento') {
        bateStatus = pesquisa.status === 'ativa';
      } else {
        bateStatus = pesquisa.status === filtroStatus;
      }

      return bateTexto && bateStatus;
    });
  }, [bancoLocal, busca, filtroStatus]);

  return (
    <div className="flex flex-col w-full mx-auto h-screen bg-slate-50">
      {/* cabeçalho */}
      <div className="w-full flex flex-col h-auto min-h-[30vh] lg:h-1/3 bg-indigo-500 shrink-0">
        {/* logo e nav */}
        <div className="w-full flex items-center justify-between h-auto min-h-[50px] lg:h-[62px] bg-indigo-700 p-3 md:p-4 gap-2 md:gap-4">
          <div className="flex items-center ml-2 md:ml-4 gap-2">
            <img src={logotipo} alt="logotipo da NextPoint" />
            <h2 className="text-white text-sm md:text-base lg:text-lg font-bold truncate">
              ResearchPoint
            </h2>
          </div>
          <Nav />
          <div className="flex">
            <button type="button" onClick={() => navigate('/Admin')}>
              <Settings className="w-4 h-4 md:size-5 text-white mr-2 md:mr-4 shrink-0 hover:text-black" />
            </button>
          </div>
        </div>
        {/* conteúdo do cabeçalho */}
        <div className="w-full flex flex-col md:flex-row items-start md:items-center justify-between p-4 md:p-6 lg:p-10 gap-4 md:gap-6">
          <div className="flex flex-col text-sm md:text-base/15 gap-1 md:gap-2">
            <h1 className="text-gray-100 font-medium text-2xl md:text-3xl lg:text-4xl">
              Pesquisas
            </h1>
            <p className="text-gray-100 font-normal text-xs md:text-sm lg:text-base max-w-lg">
              Gerencie e acompanhe o desempenho de seus formulários
            </p>
          </div>
          {/* botão add nova pesquisa */}
          <button
            onClick={() => navigate('/Formulario')}
            type="button"
            className="flex items-center gap-2 bg-gray-200 hover:bg-white text-indigo-700 font-medium py-2 px-3 md:px-4 rounded text-sm md:text-base whitespace-nowrap"
          >
            <Plus className="w-4 h-4 md:size-5 text-indigo-700 shrink-0" />
            <span className="hidden md:inline">Adicionar Pesquisa</span>
            <span className="md:hidden">Adicionar</span>
          </button>
        </div>
      </div>
      
      {/* main */}
      <div className="flex-grow overflow-y-auto w-full max-w-6xl mx-auto px-3 md:px-6 lg:px-8 py-4 md:py-6 lg:py-6 flex flex-col gap-6 md:gap-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between w-full gap-4 md:gap-6">
          <div className="w-full md:w-auto overflow-x-auto">
            {/* Passando o estado do filtro para o componente filho */}
            <Status filtroAtual={filtroStatus} setFiltro={setFiltroStatus} />
          </div>
          <div className="w-full md:w-auto md:min-w-[250px]">
            {/* Passando o estado da busca para a barra de pesquisa */}
            <SearchBar busca={busca} setBusca={setBusca} />
          </div>
        </div>

        {/* Grid de Cards */}
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
            <div className="text-center col-span-full py-12 text-slate-400 font-medium text-sm">
              Nenhum formulário encontrado para os filtros selecionados.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
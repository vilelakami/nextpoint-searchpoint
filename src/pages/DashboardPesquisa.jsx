import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
// importação dos ícones
import { Settings, Plus, LogOut } from 'lucide-react';
import logotipo from '../assets/icons/logotipo.svg';
// importação das páginas
import Nav from '../components/navbar/Nav';
import Status from '../components/status/Status';
import SearchBar from '../components/searchbar/SearchBar';
import CardForm from '../components/cards-forms/CardsForms';

// importação da biblioteca tanstack
import { useReactTable, getCoreRowModel } from '@tanstack/react-table';

// importando serviço com as funções
import { pesquisaService } from '../pages/services/PesquisaService';

export default function DashboardPesquisa() {
  const navigate = useNavigate();
  const [bancoLocal, setBancolocal] = useState([]);
  const [busca, setBusca] = useState('');
  const [filtroStatus, setFiltroStatus] = useState('todas');
  const [usuarioLogado, setUsuarioLogado] = useState(null);

  useEffect(() => {
    setBancolocal(pesquisaService.buscarTodas());
    setUsuarioLogado(JSON.parse(localStorage.getItem('usuarioLogado')));
  }, []);

  const handleAlternarPausa = (id, status) => {
    if (!pesquisaService.verificarPermissao(usuarioLogado, 'pausar')) {
      return alert("Apenas administradores podem pausar ou retomar pesquisas.");
    }
    setBancolocal(pesquisaService.executarAlternarPausa(id, status));
  };

  const handleExcluirPesquisa = (id) => {
    if (!pesquisaService.verificarPermissao(usuarioLogado, 'excluir')) {
      return alert("Apenas administradores possuem permissão para excluir formulários.");
    }
    setBancolocal(pesquisaService.executarExclusao(id));
  };

  const handleAcessarAdmin = () => {
    if (!pesquisaService.verificarPermissao(usuarioLogado, 'configuracao')) {
      return alert("Acesso restrito a Administradores.");
    }
    navigate('/Admin');
  };

  const handleCriarFormulario = () => {
    if (!pesquisaService.verificarPermissao(usuarioLogado, 'criar')) {
      return alert("Apenas Administradores possuem permissão para criar novos formulários.");
    }
    navigate('/Formulario');
  };

  const pesquisasFiltradas = useMemo(() => 
    pesquisaService.filtrarPesquisas(bancoLocal, busca, filtroStatus), 
  [bancoLocal, busca, filtroStatus]);

  return (
    <div className="flex flex-col w-full mx-auto h-screen bg-slate-50">
      <div className="w-full flex flex-col h-auto min-h-[30vh] lg:h-1/3 bg-indigo-500 shrink-0">
        <div className="w-full flex items-center justify-between h-auto min-h-[50px] lg:h-[62px] bg-indigo-700 p-3 md:p-4 gap-2 md:gap-4">
          {/* cabeçalho + nav */}
          <div className="flex items-center ml-2 md:ml-4 gap-2">
            <img src={logotipo} alt="logotipo" />
            <h2 className="text-white text-sm md:text-base lg:text-lg font-bold truncate">ResearchPoint</h2>
          </div>
          <Nav />
          <div className="flex items-center">
            {/* configurações e logout */}
            <button type="button" onClick={handleAcessarAdmin} title="Configurações">
              <Settings className="w-4 h-4 md:size-5 text-white mr-2 md:mr-4 shrink-0 hover:text-black transition-colors" />
            </button>
            <button type="button" onClick={() => { localStorage.removeItem('usuarioLogado'); navigate('/'); }} title="Sair">
              <LogOut className="w-4 h-4 md:size-5 text-white mr-2 md:mr-4 shrink-0 hover:text-black transition-colors" />
            </button>
          </div>
        </div>

        {/* hero */}
        <div className="w-full flex flex-col md:flex-row items-start md:items-center justify-between p-4 md:p-6 lg:p-10 gap-4 md:gap-6">
          <div className="flex flex-col gap-1 md:gap-2">
            <h1 className="text-gray-100 font-medium text-2xl md:text-3xl lg:text-4xl">Pesquisas</h1>
            <p className="text-gray-100 font-normal text-xs md:text-sm lg:text-base max-w-lg">Gerencie e acompanhe o desempenho de seus formulários</p>
            <p className="text-indigo-100 text-xs md:text-sm mt-1 font-normal">
              Olá, <span className="font-semibold underline">{usuarioLogado?.email}</span> ({usuarioLogado?.cargo}).
            </p>
          </div>
          {/* btn de add pesquisa */}
          <button onClick={handleCriarFormulario} type="button" className="flex items-center gap-2 bg-gray-200 hover:bg-white text-indigo-700 font-semibold py-2 px-3 md:px-4 rounded text-sm md:text-base whitespace-nowrap transition-colors shadow-sm">
            <Plus className="w-4 h-4 md:size-5 text-indigo-700 shrink-0" />
            <span className="hidden md:inline">Adicionar Pesquisa</span>
          </button>
        </div>
      </div>

      {/* main > tabs > searchbar e cards */}
      <div className="flex-grow overflow-y-auto w-full max-w-6xl mx-auto px-3 md:px-6 lg:px-8 py-6 flex flex-col gap-6 md:gap-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between w-full gap-4 md:gap-6">
          <Status filtroAtual={filtroStatus} setFiltro={setFiltroStatus} />
          <SearchBar busca={busca} setBusca={setBusca} />
        </div>

        {/* card form com a pesquisa */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5 lg:gap-6 pb-12">
          {pesquisasFiltradas.map((pesquisa) => (
            <CardForm
              key={pesquisa.id_pesquisa}
              pesquisa={pesquisa}
              cargoUsuario={usuarioLogado?.cargo}
              onAlternarPausa={() => handleAlternarPausa(pesquisa.id_pesquisa, pesquisa.status)}
              onExcluir={() => handleExcluirPesquisa(pesquisa.id_pesquisa)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
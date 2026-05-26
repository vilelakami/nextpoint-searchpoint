import React from 'react';
import Usuarios from '../../components/controle-usuarios/Usuarios';
import { ArrowLeft, UserPlus } from 'lucide-react';
import SearchBar from '../../components/searchbar/SearchBar';

export default function Admin() {
  return (
    <div className="flex flex-col w-full mx-auto h-screen font-montserrat">
      <div className="w-full flex items-center justify-between h-[62px] bg-indigo-700 p-4 shrink-0">
        <button
          onClick={() => navigate('/Dashboard')}
          type="button"
          className="flex items-center gap-2 bg-transparent text-white hover:border-b-2 border-gray-300/20 font-medium ml-2 md:ml-4 text-xs md:text-sm lg:text-base whitespace-nowrap"
        >
          <ArrowLeft className="w-5 h-5 text-white" />
          <span>Voltar ao Dashboard</span>
        </button>
      </div>
      {/* conteudo */}
      <div className='flex flex-col items-start gap-2 px-4 py-4'>
        <h1 className='text-3xl font-semibold'>Gestão de Usuários</h1>
        <p className='text-sm text-slate-500'>Configure permissões, status e dados dos usuários na plataforma</p>
      </div>
      <div className='flex itesm-center justify-between px-4 py-4'>
        <h1 className='font-semibold text-indigo-700 hover:text-indigo-950'>Usuarios (2)</h1>
        <button className='flex items-center gap-1 text-indigo-700 font-semibold hover:text-indigo-950 cursor-pointer'>
            <UserPlus className='size-4'/>
            Adicionar Supervisor
            </button>
      </div>
      <div>
        <SearchBar/>
        <Usuarios/>
      </div>
    </div>
  );
}

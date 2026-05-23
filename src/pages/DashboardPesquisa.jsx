import React from 'react';
import Nav from '../components/navbar/Nav';
import { Settings, Plus } from 'lucide-react';
import Status from '../components/status/Status';
import SearchBar from '../components/searchbar/SearchBar';
import CardForm from '../components/cards-forms/CardsForms';

export default function DashboardPesquisa() {
  return (
    <div className="flex flex-col w-full mx-auto h-screen">
      {/* cabeçalho */}
      <div className="w-full flex flex-col h-1/3 bg-indigo-500">
      {/* logo e nav */}
        <div className="w-full flex items-center justify-between h-[62px] bg-indigo-700 p-4">
          <h1 className="text-white text-base font-bold ml-4">SearchPoint</h1>
          <Nav />
          <div className="flex">
            <Settings className="size-5 text-white" />
          </div>
        </div>
        {/* conteúdo do cabeçalho */}
        <div className="w-full flex items-center justify-between p-10">
          <div className="flex flex-col text-base/15">
            <h1 className="text-gray-100 font-medium text-4xl">Pesquisas</h1>
            <p className="text-gray-100 font-normal ">
              Gerencie e acompanhe o desempenho de seus formulários
            </p>
          </div>
          {/* botão add nova pesquisa */}
          <button
            type="button"
            className="flex items-center gap-2 bg-gray-200 hover:bg-white text-indigo-700 font-medium py-2 px-4 rounded"
          >
            <Plus className="size-5 text-indigo-700" />
            Adicionar Pesquisa
          </button>
        </div>
      </div>
      {/* main */}
      <div className="flex flex-col gap-15 w-full max-w-6xl mx-auto px-4 md:px-8 py-6">
        <div className="flex items-center justify-between w-full">
          <Status />
          <SearchBar />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <CardForm />
        </div>
      </div>
    </div>
  );
}

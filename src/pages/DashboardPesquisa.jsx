import React from 'react';
import Nav from '../components/navbar/Nav';
import { Settings } from 'lucide-react';

export default function DashboardPesquisa() {
  return (
    <div className="flex w-full mx-auto h-screen">
      <div className="w-full flex flex-col h-1/3 bg-indigo-500">
        <div className="w-full flex items-center justify-between h-[62px] bg-indigo-700 p-4">
          <h1 className="text-white text-base font-bold ml-4">SearchPoint</h1>
          <Nav />
          <div className="flex">
            <Settings className="size-5 text-white" />  
          </div>
        </div>
      </div>
    </div>
  );
}

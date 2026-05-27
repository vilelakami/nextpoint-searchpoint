// src/components/status/Status.jsx
import React from 'react';
import * as Tabs from '@radix-ui/react-tabs';
import { status } from '../../utils/dados';

export default function Status({ filtroAtual, setFiltro }) {
  return (
    // O Radix Tabs controla qual valor está ativo usando as props que vieram do Dashboard
    <Tabs.Root value={filtroAtual} onValueChange={setFiltro}>
      <Tabs.List className="flex items-center gap-2 md:gap-3 flex-wrap md:flex-nowrap">
        {status.map((item) => (
          <Tabs.Trigger
            key={item.value}
            value={item.value}
            type="button"
            // O data-[state=active]: do Tailwind resolve o visual automaticamente quando o botão é o ativo
            className="bg-gray-200 text-slate-600 hover:bg-gray-300 data-[state=active]:bg-indigo-600 data-[state=active]:text-white text-xs md:text-sm font-medium py-1.5 px-4 rounded-full transition-all whitespace-nowrap cursor-pointer shadow-2xs"
          >
            {item.label}
          </Tabs.Trigger>
        ))}
      </Tabs.List>
    </Tabs.Root>
  );
}
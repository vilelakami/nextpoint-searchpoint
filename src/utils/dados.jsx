export const status = [
  { value: 'todas', label: 'Todas' },
  { value: 'em_andamento', label: 'Em Andamento' },
  { value: 'rascunho', label: 'Rascunho' },
  { value: 'em_pausa', label: 'Em Pausa' },
  { value: 'concluida', label: 'Concluída' },
];

export const statusStyles = {
  concluida: 'bg-red-100 text-red-700',
  rascunho: 'bg-slate-100 text-slate-600',
  em_pausa: 'bg-yellow-50 text-yellow-700',
  em_andamento: 'bg-orange-100 text-orange-800',
};

// Função mágica que faz o textarea crescer sozinho
export const ajustarAltura = (e) => {
  const elemento = e.target;
  elemento.style.height = 'auto'; // Reseta a altura para recalcular
  elemento.style.height = `${elemento.scrollHeight}px`; // Define a nova altura baseada no conteúdo
};

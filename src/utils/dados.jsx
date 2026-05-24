export const status = [
  { value: 'todas', label: 'Todas' },
  { value: 'ativa', label: 'Ativa' },
  { value: 'rascunho', label: 'Rascunho' },
  { value: 'concluida', label: 'Concluída' },
];

export const statusStyles = {
  ativa: 'bg-indigo-50 text-indigo-700',
  rascunho: 'bg-slate-100 text-slate-600',
  concluida: 'bg-orange-50 text-orange-700',
};

// Função mágica que faz o textarea crescer sozinho
export const ajustarAltura = (e) => {
  const elemento = e.target;
  elemento.style.height = 'auto'; // Reseta a altura para recalcular
  elemento.style.height = `${elemento.scrollHeight}px`; // Define a nova altura baseada no conteúdo
};

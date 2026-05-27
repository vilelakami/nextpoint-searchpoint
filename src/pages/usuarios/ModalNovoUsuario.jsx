import React from 'react';
import { X } from 'lucide-react';

export default function ModalUsuario({
  modalAberto,
  setModalAberto,
  novoUsuario,
  setNovoUsuario,
  idEditando,
  handleSalvarUsuario
}) {
  // se o modal não estiver aberto não renderiza na tela
  if (!modalAberto) return null;

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl shadow-xl border border-slate-200 w-full max-w-md p-6 relative mx-4 animate-in zoom-in-95 duration-150">
        
        {/* btn de fechar */}
        <button 
          type="button" 
          onClick={() => setModalAberto(false)}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 transition-colors"
        >
          <X className="size-5" />
        </button>
        
        {/* Título dinâmico */}
        <h2 className="text-xl font-semibold text-slate-800 border-b border-slate-100 pb-3 mb-4 font-montserrat">
          {idEditando ? 'Editar Usuário' : 'Adicionar Novo Supervisor'}
        </h2>
        
        <form onSubmit={handleSalvarUsuario} className="flex flex-col gap-4 font-montserrat">
          {/* nome */}
          <div className="flex flex-col gap-1">
            <label className="text-xs font-semibold text-slate-500 uppercase">Nome Completo</label>
            <input 
              type="text" 
              value={novoUsuario.nome || ''}
              onChange={(e) => setNovoUsuario({ ...novoUsuario, nome: e.target.value })}
              placeholder="Ex: Carlos Alberto"
              className="w-full px-3 py-2 border border-slate-200 rounded-xl outline-none text-sm focus:border-indigo-500 font-medium transition-all"
              required
            />
          </div>

          {/* email */}
          <div className="flex flex-col gap-1">
            <label className="text-xs font-semibold text-slate-500 uppercase">E-mail Corporativo</label>
            <input 
              type="email" 
              value={novoUsuario.email || ''}
              onChange={(e) => setNovoUsuario({ ...novoUsuario, email: e.target.value })}
              placeholder="Ex: carlos@researchpoint.com"
              className="w-full px-3 py-2 border border-slate-200 rounded-xl outline-none text-sm focus:border-indigo-500 font-medium transition-all"
              required
            />
          </div>

          {/* senha de acesso */}
          <div className="flex flex-col gap-1">
            <label className="text-xs font-semibold text-slate-500 uppercase">Senha de Acesso</label>
            <input 
              type="password" 
              value={novoUsuario.senha || ''}
              onChange={(e) => setNovoUsuario({ ...novoUsuario, senha: e.target.value })}
              placeholder={idEditando ? "Digite uma nova senha ou mantenha" : "Crie uma senha de até 8 dígitos"}
              maxLength="8"
              className="w-full px-3 py-2 border border-slate-200 rounded-xl outline-none text-sm focus:border-indigo-500 font-medium transition-all"
              required={!idEditando} // Só é obrigatório se for um novo cadastro
            />
          </div>

          {/* select do cargo */}
          <div className="flex flex-col gap-1">
            <label className="text-xs font-semibold text-slate-500 uppercase">Cargo / Nível de Acesso</label>
            <select 
              value={novoUsuario.cargo || 'Pesquisador'}
              onChange={(e) => setNovoUsuario({ ...novoUsuario, cargo: e.target.value })}
              className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl outline-none text-sm focus:border-indigo-500 font-medium cursor-pointer transition-all"
            >
              <option value="Admin">Admin</option>
              <option value="Pesquisador">Pesquisador</option>
            </select>
          </div>

          {/* footer */}
          <div className="flex items-center justify-end gap-3 mt-4 pt-3 border-t border-slate-100">
            <button 
              type="button" 
              onClick={() => setModalAberto(false)}
              className="px-4 py-2 text-sm font-medium text-slate-500 hover:bg-slate-100 rounded-xl transition-colors"
            >
              Cancelar
            </button>
            <button 
              type="submit"
              className="px-5 py-2 text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl shadow-md transition-colors"
            >
              {idEditando ? 'Salvar Alterações' : 'Cadastrar'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// impotração dos ícones
import { ArrowLeft, UserPlus, Trash2, Pencil } from 'lucide-react';
// importação das páginas
import SearchBar from '../../components/searchbar/SearchBar';
import ModalUsuario from '../usuarios/ModalNovoUsuario'; 

export default function Admin() {
  const navigate = useNavigate();

  // array com os usuários (exemplos)
  const [listaUsuarios, setListaUsuarios] = useState([
    {
      id: '1',
      nome: 'Regis Nogueira',
      email: 'regisnogueira@example.com',
      cargo: 'Admin',
    },
    {
      id: '2',
      nome: 'Matheus Taveira',
      email: 'mateustaveira@example.com',
      cargo: 'Pesquisador',
    }
  ]);

  // estadsos de controle > abrir modal > add novo usuario > editar usuario
  const [modalAberto, setModalAberto] = useState(false);
  const [novoUsuario, setNovoUsuario] = useState({ nome: '', email: '', cargo: 'Pesquisador' });
  const [idEditando, setIdEditando] = useState(null);

  // lógica de salvar/editar usuário
  const handleSalvarUsuario = (e) => {
    e.preventDefault();
    if (!novoUsuario.nome || !novoUsuario.email) return;

    if (idEditando) {
      setListaUsuarios(listaUsuarios.map(user => 
        user.id === idEditando ? { ...user, ...novoUsuario } : user
      ));
      setIdEditando(null);
    } else {
      const usuarioCriado = {
        id: Date.now().toString(),
        ...novoUsuario
      };
      setListaUsuarios([...listaUsuarios, usuarioCriado]);
    }

    setNovoUsuario({ nome: '', email: '', cargo: 'Pesquisador' });
    setModalAberto(false);
  };

  const handleMudarCargo = (idUsuario, novoCargo) => {
    setListaUsuarios(listaUsuarios.map(user => 
      user.id === idUsuario ? { ...user, cargo: novoCargo } : user
    ));
  };

  const handleExcluirUsuario = (idUsuario) => {
    setListaUsuarios(listaUsuarios.filter(user => user.id !== idUsuario));
  };

  const handleIniciarEdicao = (usuario) => {
    setIdEditando(usuario.id);
    setNovoUsuario({ nome: usuario.nome, email: usuario.email, cargo: usuario.cargo });
    setModalAberto(true);
  };

  return (
    <div className="flex flex-col w-full mx-auto h-screen font-montserrat bg-slate-50/50 relative">
      {/* Cabeçalho */}
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

      {/* conteúdo titulo descficao */}
      <div className='flex flex-col items-start gap-2 px-6 py-4 mt-2'>
        <h1 className='text-3xl font-semibold text-slate-800'>Gestão de Usuários</h1>
        <p className='text-sm text-slate-500'>Configure permissões, status e dados dos usuários na plataforma</p>
      </div>

      {/* exibe a qntde de users cadastrados */}
      <div className='flex items-center justify-between px-6 py-2'>
        <h1 className='font-semibold text-indigo-700 hover:text-indigo-950 text-base md:text-lg'>
          Usuários ({listaUsuarios.length})
        </h1>
        {/* btn de add pesquisador */}
        <button 
          onClick={() => {
            setIdEditando(null);
            setNovoUsuario({ nome: '', email: '', cargo: 'Pesquisador' });
            setModalAberto(true);
          }}
          className='flex items-center gap-1 text-indigo-700 font-semibold hover:text-indigo-950 cursor-pointer text-sm bg-indigo-50 hover:bg-indigo-100 px-3 py-1.5 rounded-lg transition-colors'
        >
          <UserPlus className='size-4'/>
          Adicionar Pesquisador
        </button>
      </div>

      {/* Barra de Busca e Listagem em Tabela */}
      <div className="px-6 flex-grow flex flex-col">
        <div className='flex justify-center w-full mb-4 mt-2'>
          <SearchBar />
        </div>
        
        {/* Tabela de Usuários Customizada */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-x-auto flex-grow mb-6">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-100 text-xs font-semibold text-slate-400 uppercase bg-slate-50/50">
                <th className="py-3 px-4">Nome</th>
                <th className="py-3 px-4">Cargo Atual</th>
                <th className="py-3 px-4">Permissão</th>
                <th className="py-3 px-4">Email</th>
                <th className="py-3 px-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm text-slate-700">
              {listaUsuarios.map((user) => (
                <tr key={user.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="py-4 px-4 font-medium text-slate-900">{user.nome}</td>
                  <td className="py-4 px-4">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                      user.cargo === 'Admin' ? 'bg-indigo-50 text-indigo-700' : 'bg-slate-100 text-slate-600'
                    }`}>
                      {user.cargo}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <select
                      value={user.cargo}
                      onChange={(e) => handleMudarCargo(user.id, e.target.value)}
                      className="bg-white border border-slate-200 rounded-lg text-xs font-medium px-2 py-1 outline-none focus:border-indigo-500 cursor-pointer text-slate-700"
                    >
                      <option value="Admin">Admin</option>
                      <option value="Pesquisador">Pesquisador</option>
                    </select>
                  </td>
                  <td className="py-4 px-4 text-slate-500">{user.email}</td>
                  <td className="py-4 px-4">
                    <div className="flex items-center justify-center gap-3">
                      {/* ações editar e excluir usuario */}
                      <button 
                        onClick={() => handleIniciarEdicao(user)}
                        className="text-slate-400 hover:text-indigo-600 p-1 rounded transition-colors"
                        title="Editar dados"
                      >
                        <Pencil className="size-4" />
                      </button>
                      <button 
                        onClick={() => handleExcluirUsuario(user.id)}
                        className="text-slate-400 hover:text-red-600 p-1 rounded transition-colors"
                        title="Excluir usuário"
                      >
                        <Trash2 className="size-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {listaUsuarios.length === 0 && (
            <div className="text-center py-12 text-slate-400 font-medium">
              Nenhum usuário cadastrado na plataforma.
            </div>
          )}
        </div>
      </div>

      {/* passando funções via props pro modal */}
      <ModalUsuario 
        modalAberto={modalAberto}
        setModalAberto={setModalAberto}
        novoUsuario={novoUsuario}
        setNovoUsuario={setNovoUsuario}
        idEditando={idEditando}
        handleSalvarUsuario={handleSalvarUsuario}
      />
    </div>
  );
}
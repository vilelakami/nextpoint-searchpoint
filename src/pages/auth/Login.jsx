import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// importação dos ícones
import { User, Lock, LogIn } from 'lucide-react';
import logotipo from '../../assets/icons/logotipo.svg';

// Importação do serviço unificado 
import { usuarioService } from '../services/UsuariosService';

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  function handleLogin(e) {
    if (e) e.preventDefault();

    if (email.trim() === '' || senha.trim() === '') {
      alert('Preencha todos os campos para continuar.');
      return;
    }

    // a lógica pesada fica no service
    let usuario = usuarioService.buscarPorEmail(email);

    if (usuario) {
      if (usuario.senha && usuario.senha !== senha) {
        alert('Senha incorreta!');
        return;
      }

      // se for primeiro acesso de usuário cadastrado pelo admin sem senha
      if (!usuario.senha) {
        usuarioService.atualizarSenha(usuario.id, senha);
        usuario.senha = senha;
      }
    } else {
      // se for criado pelo login um auto-cadastro com email inexistente
      usuario = usuarioService.cadastrarPesquisadorAuto(email, senha);
      alert('Bem-vindo! Perfil de Pesquisador criado automaticamente.');
    }

    usuarioService.salvarSessao(usuario);
    navigate('/Dashboard');
  }

  return (
    <div className="w-full min-h-screen bg-slate-50 flex items-center justify-center p-4 antialiased font-sans">
      <div className="w-full max-w-4xl bg-white rounded-2xl shadow-xl overflow-hidden grid grid-cols-1 md:grid-cols-2 min-h-[500px]">
        {/* Lado Esquerdo -> Identidade Visual */}
        <div className="bg-indigo-700 p-8 md:p-12 flex flex-col justify-between items-center text-white select-none">
          <div></div>
          <div className="w-max flex items-center gap-2">
            <img className='size-9' src={logotipo} alt="logotipo" />
            <h1 className="animate-typing overflow-hidden whitespace-nowrap border-r-4 border-r-white pr-2 text-3xl md:text-4xl font-semibold tracking-tight mb-2">
              ResearchPoint
            </h1>
          </div>
          <p className="text-indigo-200 text-sm md:text-base font-normal pl-1 italic">
            Powered by NextPoint
          </p>
        </div>

        {/* Lado Direito -> Formulário */}
        <div className="p-8 md:p-12 flex flex-col items-center justify-center bg-white">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-8">Login</h2>
          <form onSubmit={handleLogin} className="flex flex-col gap-5 w-full max-w-sm">
            <div className="flex items-center gap-3 border border-gray-300 rounded-lg px-4 py-3 focus-within:border-indigo-600 focus-within:ring-2 focus-within:ring-indigo-100 transition-all">
              <User className="size-5 opacity-60 text-slate-400" />
              <input
                type="email"
                placeholder="E-mail corporativo *"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full bg-transparent text-gray-700 placeholder-gray-400 focus:outline-none text-sm md:text-base"
              />
            </div>
            <div className="flex items-center gap-3 border border-gray-300 rounded-lg px-4 py-3 focus-within:border-indigo-600 focus-within:ring-2 focus-within:ring-indigo-100 transition-all">
              <Lock className="size-5 opacity-60 text-slate-400" />
              <input
                type="password"
                placeholder="Senha *"
                maxLength="8"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                required
                className="w-full bg-transparent text-gray-700 placeholder-gray-400 focus:outline-none text-sm md:text-base"
              />
            </div>
            <button type="submit" className="mt-4 flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-6 rounded-lg shadow-md transition-all">
              <LogIn className="w-5 h-5 invert" />
              Entrar
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
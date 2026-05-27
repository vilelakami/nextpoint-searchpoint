import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Lock, LogIn } from 'lucide-react';

// Importação do serviço unificado de Usuários
import { usuarioService } from '../services/UsuariosService';

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  function handleLogin(e) {
    if (e) e.preventDefault();

    if (email.trim() === '' || senha.trim() === '') {
      alert('Preencha todos os campos para continuar.');
      return;
    }

    // procura se o e-mail digitado já existe no sistema 
    let usuario = usuarioService.buscarPorEmail(email);

    if (usuario) {
      // se o usuário existe precisamos validar se a senha bate
      if (usuario.senha && usuario.senha !== senha) {
        alert('Senha incorreta! Verifique suas credenciais.');
        return;
      }

      // Se o Admin cadastrou o usuário mas não definiu senha no modal antigo,
      // associamos a senha que ele digitou agora para as próximas vezes
      if (!usuario.senha) {
        const todosUsuarios = usuarioService.buscarTodos();
        const listaAtualizada = todosUsuarios.map((u) =>
          u.id === usuario.id ? { ...u, senha: senha } : u,
        );
        localStorage.setItem('usuarios', JSON.stringify(listaAtualizada));
        usuario.senha = senha;
      }
    } else {
      // se nao existir o e-mail de jeito nenhum cria o auto-cadastro de pesquisador
      usuario = usuarioService.cadastrarPesquisadorAuto(email, senha);
      alert(
        `Bem-vindo ao ResearchPoint! Identificamos que este é o seu primeiro acesso. Um perfil de "Pesquisador" foi criado automaticamente com a senha digitada.`,
      );
    }

    // grava na sessão ativa do navegador e vai para o Dashboard
    usuarioService.salvarSessao(usuario);
    navigate('/Dashboard');
  }

  return (
    <div className="w-full min-h-screen bg-slate-50 flex items-center justify-center p-4 antialiased font-sans">
      {/* Container principal */}
      <div className="w-full max-w-4xl bg-white rounded-2xl shadow-xl overflow-hidden grid grid-cols-1 md:grid-cols-2 min-h-[500px]">
        {/* Lado Esquerdo -> Identidade Visual com Animação Typing */}
        <div className="bg-indigo-700 p-8 md:p-12 flex flex-col justify-center text-white select-none">
          <div className="w-max">
            <h1 className="animate-typing overflow-hidden whitespace-nowrap border-r-4 border-r-white pr-2 text-3xl md:text-4xl font-semibold tracking-tight mb-2">
              ResearchPoint
            </h1>
          </div>
          <p className="text-indigo-200 text-sm md:text-base font-normal pl-1">
            Powered by NextPoint
          </p>
        </div>

        {/* Lado Direito -> Formulário */}
        <div className="p-8 md:p-12 flex flex-col items-center justify-center bg-white">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-8">
            Login
          </h2>

          <form
            onSubmit={handleLogin}
            className="flex flex-col gap-5 w-full max-w-sm"
          >
            {/* Input E-mail */}
            <div className="flex items-center gap-3 border border-gray-300 rounded-lg px-4 py-3 bg-white focus-within:border-indigo-600 focus-within:ring-2 focus-within:ring-indigo-100 transition-all">
              <User className="size-5 opacity-60 text-slate-400" />
              <input
                type="email"
                placeholder="E-mail corporativo *"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="email"
                className="w-full bg-transparent text-gray-700 placeholder-gray-400 focus:outline-none text-sm md:text-base"
              />
            </div>

            {/* Input Senha */}
            <div className="flex items-center gap-3 border border-gray-300 rounded-lg px-4 py-3 bg-white focus-within:border-indigo-600 focus-within:ring-2 focus-within:ring-indigo-100 transition-all">
              <Lock className="size-5 opacity-60 text-slate-400" />
              <input
                type="password"
                placeholder="Senha *"
                maxLength="8"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                autoComplete="current-password"
                required
                className="w-full bg-transparent text-gray-700 placeholder-gray-400 focus:outline-none text-sm md:text-base"
              />
            </div>

            {/* Botão Entrar / Cadastrar */}
            <button
              type="submit"
              className="mt-4 flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-6 rounded-lg shadow-md hover:shadow-lg transition-all text-sm md:text-base"
            >
              <LogIn className="w-5 h-5 invert" />
              Entrar
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;

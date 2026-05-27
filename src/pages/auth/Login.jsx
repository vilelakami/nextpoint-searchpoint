import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Importações dos seus ícones mantidas
import { User, Lock, LogIn } from 'lucide-react';

function Login() {
  const navigate = useNavigate();
  
  // dados de login
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  // autenticação de cargos
  function handleLogin(e) {
    if (e) e.preventDefault();

    if (email.trim() === '' || senha.trim() === '') {
      alert('Preencha todos os campos para continuar.');
      return;
    }

    // usuarios (exemplo)
    const usuariosCadastrados = JSON.parse(localStorage.getItem('usuarios')) || [
      {
        id: '1',
        nome: 'Regis Nogueira (Padrão)',
        email: 'regis@example.com',
        cargo: 'Admin'
      },
      {
        id: '2',
        nome: 'Matheus Taveira (Padrão)',
        email: 'matheus@example.com',
        cargo: 'Pesquisador'
      }
    ];

    // ve se existe o e-mail digitado
    const usuarioEncontrado = usuariosCadastrados.find(
      (user) => user.email.toLowerCase() === email.trim().toLowerCase()
    );

    if (usuarioEncontrado) {
      // salva os dados do usuário na sessão ativa do navegador
      localStorage.setItem('usuarioLogado', JSON.stringify(usuarioEncontrado));
      
      // manda para o Dashboard e verifica se a pessoa é pesquisador ou admin
      navigate('/Dashboard');
    } else {
      alert('E-mail não cadastrado! Peça para um Administrador cadastrar você na aba "Gestão de Usuários".');
    }
  }

  return (
    <div className="w-full min-h-screen bg-slate-50 flex items-center justify-center p-4 antialiased font-sans">
      
      {/* container */}
      <div className="w-full max-w-4xl bg-white rounded-2xl shadow-xl overflow-hidden grid grid-cols-1 md:grid-cols-2 min-h-[500px]">
        
        {/* lado esq -> identidade visual */}
        <div className="bg-indigo-700 p-8 md:p-12 flex flex-col justify-center text-white">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-2">
            ResearchPoint
          </h2>
          <p className="text-indigo-200 text-sm md:text-base font-medium">
            Powered by NextPoint
          </p>
        </div>

        {/* lado direito -> forms */}
        <div className="p-8 md:p-12 flex flex-col justify-center bg-white">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-8">
            Login
          </h2>

          <form onSubmit={handleLogin} className="flex flex-col gap-5">
            
            {/* email */}
            <div className="flex items-center gap-3 border border-gray-300 rounded-lg px-4 py-3 bg-white focus-within:border-indigo-600 focus-within:ring-2 focus-within:ring-indigo-100 transition-all">
              <User className="size-5 opacity-60" />
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

            {/* senha */}
            <div className="flex items-center gap-3 border border-gray-300 rounded-lg px-4 py-3 bg-white focus-within:border-indigo-600 focus-within:ring-2 focus-within:ring-indigo-100 transition-all">
              <Lock className="size-5 opacity-60" />
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

            {/* entrar */}
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
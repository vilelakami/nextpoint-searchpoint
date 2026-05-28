/**
 * SERVIÇO CENTRALIZADO DE USUÁRIOS (ResearchPoint)
 * Gerencia a lista de usuários cadastrados, senhas e a sessão ativa.
 */

const KEY_USUARIOS = 'usuarios';
const KEY_LOGADO = 'usuarioLogado';

export const usuarioService = {
  // busca todos os usuários cadastrados ou devolve a lista padrão inicial gravada
  buscarTodos: () => {
    try {
      const armazenados = localStorage.getItem(KEY_USUARIOS);
      if (armazenados) {
        return JSON.parse(armazenados);
      }
      
      const padroes = [
        {
          id: '1',
          nome: 'Regis Nogueira (Padrão)',
          email: 'regis@example.com',
          senha: 'admin',
          cargo: 'Admin',
        },
        {
          id: '2',
          nome: 'Matheus Taveira (Padrão)',
          email: 'matheus@example.com',
          senha: 'senha',
          cargo: 'Pesquisador',
        },
      ];
      localStorage.setItem(KEY_USUARIOS, JSON.stringify(padroes));
      return padroes;
    } catch (error) {
      console.error("Erro ao ler usuários do localStorage", error);
      return [];
    }
  },

  // salva a lista completa editada pelo Admin de volta no LocalStorage
  atualizarListaCompleta: (novaLista) => {
    localStorage.setItem(KEY_USUARIOS, JSON.stringify(novaLista));
  },

  // procura um usuário pelo e-mail
  buscarPorEmail: (email) => {
    if (!email) return null;
    const usuarios = usuarioService.buscarTodos();
    return usuarios.find(
      (user) => user.email && user.email.trim().toLowerCase() === email.trim().toLowerCase()
    );
  },

  // cadastra automaticamente um novo Pesquisador no primeiro acesso via login
  cadastrarPesquisadorAuto: (email, senhaDefinida) => {
    const usuarios = usuarioService.buscarTodos();
    
    const nomeInicial = email.split('@')[0];
    const nomeFormatado = nomeInicial.charAt(0).toUpperCase() + nomeInicial.slice(1);

    const novoPesquisador = {
      id: Date.now().toString(),
      nome: `${nomeFormatado}`,
      email: email.trim().toLowerCase(),
      senha: senhaDefinida || '12345678',
      cargo: 'Pesquisador'
    };

    const novaLista = [...usuarios, novoPesquisador];
    localStorage.setItem(KEY_USUARIOS, JSON.stringify(novaLista));
    
    return novoPesquisador;
  },

  // salva o usuário na sessão ativa de login
  salvarSessao: (usuario) => {
    localStorage.setItem(KEY_LOGADO, JSON.stringify(usuario));
  }
};
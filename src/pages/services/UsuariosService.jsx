/**
 * SERVIÇO CENTRALIZADO DE USUÁRIOS (ResearchPoint)
 * Gerencia a lista de usuários cadastrados e a sessão ativa.
 */

const KEY_USUARIOS = 'usuarios';
const KEY_LOGADO = 'usuarioLogado';

export const usuarioService = {
  // busca todos os usuários cadastrados ou devolve a lista padrão inicial
  buscarTodos: () => {
    try {
      return JSON.parse(localStorage.getItem(KEY_USUARIOS)) || [
        {
          id: '1',
          nome: 'Regis Nogueira (Padrão)',
          email: 'regis@example.com',
          cargo: 'Admin',
        },
        {
          id: '2',
          nome: 'Matheus Taveira (Padrão)',
          email: 'matheus@example.com',
          cargo: 'Pesquisador',
        },
      ];
    } catch (error) {
      console.error("Erro ao ler usuários do localStorage", error);
      return [];
    }
  },

  // procura um usuário pelo e-mail
  buscarPorEmail: (email) => {
    const usuarios = usuarioService.buscarTodos();
    return usuarios.find(
      (user) => user.email.toLowerCase() === email.trim().toLowerCase()
    );
  },

  // cadastra automaticamente um novo pesquisador no sistema
  cadastrarPesquisadorAuto: (email) => {
    const usuarios = usuarioService.buscarTodos();
    
    // extrai a primeira parte do e-mail para usar temporariamente como o nome da pessoa
    const nomeIncial = email.split('@')[0];
    const nomeFormatado = nomeIncial.charAt(0).toUpperCase() + nomeIncial.slice(1);

    const novoPesquisador = {
      id: Date.now().toString(),
      nome: `${nomeFormatado} (Pesquisador)`,
      email: email.trim().toLowerCase(),
      cargo: 'Pesquisador' // Define o cargo fixo de Pesquisador
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
const KEY_PESQUISAS = 'pesquisas';

export const pesquisaService = {
  buscarTodas: () => {
    try {
      return JSON.parse(localStorage.getItem(KEY_PESQUISAS)) || [];
    } catch (error) {
      console.error("Erro ao ler pesquisas", error);
      return [];
    }
  },

  buscarPorId: (id) => {
    const pesquisas = pesquisaService.buscarTodas();
    return pesquisas.find((p) => p.id_pesquisa === id) || null;
  },

  salvarProgresso: (id, novoStatus, respostasAtuais) => {
    const pesquisas = pesquisaService.buscarTodas();
    const listaAtualizada = pesquisas.map((p) => {
      if (p.id_pesquisa === id) {
        return { ...p, status: novoStatus, respostasSalvas: respostasAtuais };
      }
      return p;
    });
    localStorage.setItem(KEY_PESQUISAS, JSON.stringify(listaAtualizada));
    return true;
  },

  salvarEstruturaFormulario: (dadosFormulario, determinarStatus) => {
    const pesquisas = pesquisaService.buscarTodas();
    const idFinal = dadosFormulario.id_pesquisa || Date.now().toString();
    
    const statusFinal = determinarStatus === 'pronta' ? 'em_andamento' : determinarStatus;

    const novoForms = {
      ...dadosFormulario,
      id_pesquisa: idFinal,
      status: statusFinal, 
    };

    const existe = pesquisas.some(p => p.id_pesquisa === idFinal);
    let listaAtualizada;

    if (existe) {
      listaAtualizada = pesquisas.map(p => p.id_pesquisa === idFinal ? novoForms : p);
    } else {
      listaAtualizada = [...pesquisas, novoForms];
    }

    localStorage.setItem(KEY_PESQUISAS, JSON.stringify(listaAtualizada));
    return true;
  },

  alternarPausa: (idPesquisa, statusAtual) => {
    const pesquisas = pesquisaService.buscarTodas();
    const novoStatus = statusAtual === 'em_pausa' ? 'em_andamento' : 'em_pausa';

    const listaAtualizada = pesquisas.map((pesquisa) => {
      if (pesquisa.id_pesquisa === idPesquisa) {
        return {
          ...pesquisa,
          status: novoStatus
        };
      }
      return pesquisa;
    });

    localStorage.setItem(KEY_PESQUISAS, JSON.stringify(listaAtualizada));
    return listaAtualizada;
  },

  excluir: (idPesquisa) => {
    const pesquisas = pesquisaService.buscarTodas();
    const listaFiltrada = pesquisas.filter((p) => p.id_pesquisa !== idPesquisa);
    localStorage.setItem(KEY_PESQUISAS, JSON.stringify(listaFiltrada));
    return listaFiltrada; 
  },

  filtrarPesquisas: (lista, busca, filtroStatus) => {
    const termoBusca = busca.toLowerCase().trim();
    return lista.filter((pesquisa) => {
      const titulo = (pesquisa.titulo || '').toLowerCase();
      const registro = String(pesquisa.id_pesquisa || '').toLowerCase();
      const bateTexto = titulo.includes(termoBusca) || registro.includes(termoBusca);

      let bateStatus = false;
      if (filtroStatus === 'todas') {
        bateStatus = true;
      } else {
        bateStatus = pesquisa.status === filtroStatus;
      }
      return bateTexto && bateStatus;
    });
  },

  gerarFormularioVazio: () => ({
    id_pesquisa: '',
    titulo: '',
    descricao: '',
    status: 'rascunho',
    perguntas: [
      {
        id: Date.now().toString(),
        tipo_bloco: 'pergunta',
        titulo: '',
        descricao: '',
        tipo: 'multipla_escolha',
        obrigatoria: false,
        imagem: null,
        opcoes: [''],
      },
    ],
  }),

  criarNovaPerguntaEstrutura: () => ({
    id: Date.now().toString(),
    tipo_bloco: 'pergunta',
    titulo: '',
    descricao: '',
    tipo: 'multipla_escolha',
    obrigatoria: false,
    opcoes: [''],
  }),

  criarNovoTituloEstrutura: () => ({
    id: Date.now().toString(),
    tipo_bloco: 'titulo_bloco',
    titulo: 'Novo Título'
  }),

  verificarPermissao: (usuario, acao) => {
    if (!usuario) return false;
    if (usuario.cargo === 'Admin') return true;
    const permissoes = {
      pausar: ['Admin'],
      excluir: ['Admin'],
      configuracao: ['Admin'],
      criar: ['Admin']
    };
    return permissoes[acao]?.includes(usuario.cargo);
  },

  executarAlternarPausa: (id, statusAtual) => {
    return pesquisaService.alternarPausa(id, statusAtual);
  },

  executarExclusao: (id) => {
    return pesquisaService.excluir(id);
  },

  validarPerguntasObrigatorias: (perguntas, respostas) => {
    return perguntas.filter(p => {
      if (p.tipo_bloco && p.tipo_bloco !== 'pergunta') return false;
      if (!p.obrigatoria) return false;
      const resp = respostas[p.id];
      return !resp || (Array.isArray(resp) && resp.length === 0) || String(resp).trim() === '';
    });
  },

  salvarColetaRespostas: (idPesquisa, tituloPesquisa, respostas, statusFinal) => {
    const todasPesquisas = pesquisaService.buscarTodas();
    const pesquisasAtualizadas = todasPesquisas.map(p => 
      p.id_pesquisa === idPesquisa ? { ...p, status: statusFinal } : p
    );
    localStorage.setItem(KEY_PESQUISAS, JSON.stringify(pesquisasAtualizadas));

    const historicoRespostas = JSON.parse(localStorage.getItem('respostas_pesquisas') || '[]');
    const novaFicha = {
      id_coleta: Date.now().toString(),
      id_pesquisa: idPesquisa,
      titulo_pesquisa: tituloPesquisa,
      data: new Date().toLocaleDateString('pt-BR'),
      respostas: respostas
    };
    historicoRespostas.push(novaFicha);
    localStorage.setItem('respostas_pesquisas', JSON.stringify(historicoRespostas));

    return true;
  }
};
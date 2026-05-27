/**
 * SERVIÇO CENTRALIZADO DE PESQUISAS (ResearchPoint)
 * Gerencia toda a persistência, busca, alteração e deleção no LocalStorage.
 */

const KEY_PESQUISAS = 'pesquisas';

export const pesquisaService = {
  // busca todas as pesquisas salvas no sistema
  buscarTodas: () => {
    try {
      return JSON.parse(localStorage.getItem(KEY_PESQUISAS)) || [];
    } catch (error) {
      console.error('Erro ao ler pesquisas do localStorage', error);
      return [];
    }
  },

  // busca uma única pesquisa pelo ID dela
  buscarPorId: (id) => {
    const pesquisas = pesquisaService.buscarTodas();
    return pesquisas.find((p) => p.id_pesquisa === id) || null;
  },

  // usado na tela "ResponderFormulario": atualiza o status e as respostas dadas
  salvarProgresso: (id, novoStatus, respostasAtuais) => {
    const pesquisas = pesquisaService.buscarTodas();

    const listaAtualizada = pesquisas.map((p) => {
      if (p.id_pesquisa === id) {
        return {
          ...p,
          status: novoStatus,
          respostasSalvas: respostasAtuais,
        };
      }
      return p;
    });

    localStorage.setItem(KEY_PESQUISAS, JSON.stringify(listaAtualizada));
    return true;
  },

  // usado na tela "Formulario": salva/atualiza a estrutura (o modelo) criado ou editado
  salvarFormularioCompleto: (dadosFormulario) => {
    const pesquisas = pesquisaService.buscarTodas();
    const idFinal = dadosFormulario.id_pesquisa || Date.now().toString();

    const novoForms = {
      ...dadosFormulario,
      id_pesquisa: idFinal,
      status: 'rascunho',
    };

    const existe = pesquisas.some((p) => p.id_pesquisa === idFinal);
    let listaAtualizada;

    if (existe) {
      listaAtualizada = pesquisas.map((p) =>
        p.id_pesquisa === idFinal ? novoForms : p,
      );
    } else {
      listaAtualizada = [...pesquisas, novoForms];
    }

    localStorage.setItem(KEY_PESQUISAS, JSON.stringify(listaAtualizada));
    return true;
  },

  // usado na tela "Dashboard": Alterna entre Pausado (em_pausa) e Ativo (rascunho)
  alternarPausa: (idPesquisa, statusAtual) => {
    const pesquisas = pesquisaService.buscarTodas();
    const novoStatus = statusAtual === 'em_pausa' ? 'rascunho' : 'em_pausa';

    const listaAtualizada = pesquisas.map((p) => {
      if (p.id_pesquisa === idPesquisa) {
        return { ...p, status: novoStatus };
      }
      return p;
    });

    localStorage.setItem(KEY_PESQUISAS, JSON.stringify(listaAtualizada));
    return listaAtualizada;
  },

  // usado na tela "Dashboard": exclui permanentemente uma pesquisa
  excluir: (idPesquisa) => {
    const pesquisas = pesquisaService.buscarTodas();
    const listaFiltrada = pesquisas.filter((p) => p.id_pesquisa !== idPesquisa);

    localStorage.setItem(KEY_PESQUISAS, JSON.stringify(listaFiltrada));
    return listaFiltrada;
  },

  // usado na barra de buscas do "Dashboard": filtra por texto (Título/Registro) e Aba de Status
  filtrarPesquisas: (lista, busca, filtroStatus) => {
    const termoBusca = busca.toLowerCase().trim();

    return lista.filter((pesquisa) => {
      const titulo = (pesquisa.titulo || '').toLowerCase();
      const registro = String(pesquisa.id_pesquisa || '').toLowerCase();

      const bateTexto =
        titulo.includes(termoBusca) || registro.includes(termoBusca);

      let bateStatus = false;
      if (filtroStatus === 'todas') {
        bateStatus = true;
      } else if (filtroStatus === 'em_andamento') {
        bateStatus = pesquisa.status === 'ativa';
      } else {
        bateStatus = pesquisa.status === filtroStatus;
      }

      return bateTexto && bateStatus;
    });
  },

  // usado para iniciar o estado de um formulário novo
  gerarFormularioVazio: () => ({
    id_pesquisa: '',
    titulo: '',
    descricao: '',
    nome_entrevistado: '',
    idade_entrevistado: '',
    sexo_entrevistado: '',
    escolaridade_entrevistado: '',
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
};

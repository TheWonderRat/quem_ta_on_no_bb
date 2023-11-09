const { default: QueryModel } = require('./queryModel');
const { default: StatsModel } = require('./statsModel');
const { default: UserModel } = require('./userModel');
const { default: QueryController } = require('./queryController');
const { default: StatsController } = require('./statsController');
const { default: UserController } = require('./userController');
const { default: criarBotao } = require('./criaBotao');

/* --------------------------------variáveis globais------------------*/
const TOKEN_NAME = 'user-token';
const USUARIO = [];

/* --------------------------------modelos e controladores------------------*/

const STATS_MODEL = new StatsModel();
const QUERY_MODEL = new QueryModel();
const USER_MODEL = new UserModel();

const STATS_CONTROLLER = new StatsController();
const QUERY_CONTROLLER = new QueryController();
const USER_CONTROLLER = new UserController();

/* -----------------------------------implementacao da logica---------------------------------------------*/

const QUERY = [
  criarBotao('lista-3-1', async (controller) => {
    const queryResult = await controller.getListaTresParaUm(40, 0, sessionStorage.getItem(TOKEN_NAME));
    // TODO:: alterar quando reconfigurar o servico de 3-1
    // TODO:: if is ok...
    const queryMap = queryResult.aprovados.map((e) => criarElementoAprovado(e, 'usuario_posicaoAmpla'));
    console.log(queryMap);
    loadQueryResults(queryResult.ok, queryMap);
  }),
  criarBotao('lista-4-1', async (controller) => {
    // TODO:: alterar quando reconfigurar o servico de 4-1
    const queryResult = await controller.getListaQuatroParaUm(40, 0, sessionStorage.getItem(TOKEN_NAME));
    // TODO:: if is ok...
    const queryMap = queryResult.aprovados.map((e) => criarElementoAprovado(e, 'usuario_posicaoAmpla'));
    loadQueryResults(queryResult.ok, queryMap);
  }),
  criarBotao('lista-pcd', async (controller) => {
    const queryResult = await controller.getListaPCD(40, 0, sessionStorage.getItem(TOKEN_NAME));
    // TODO:: if is ok...
    const queryMap = queryResult.aprovados.map((e) => criarElementoAprovado(e, 'usuario_posicaoPCD'));
    loadQueryResults(queryResult.ok, queryMap);
  }),
  criarBotao('lista-ppp', async (controller) => {
    const queryResult = await controller.getListaPPP(40, 0, sessionStorage.getItem(TOKEN_NAME));
    // TODO:: if is ok...
    const queryMap = queryResult.aprovados.map((e) => criarElementoAprovado(e, 'usuario_posicaoPPP'));
    loadQueryResults(queryResult.ok, queryMap);
  }),
  criarBotao('lista-ampla', async (controller) => {
    const queryResult = await controller.getListaAmpla(40, 0, sessionStorage.getItem(TOKEN_NAME));
    // TODO:: if is ok...
    const queryMap = queryResult.aprovados.map((e) => criarElementoAprovado(e, 'usuario_posicaoAmpla'));
    loadQueryResults(queryResult.ok, queryMap);
  }),
];

const STATS = [
  criarBotao('nomeacoes', (controller) => { controller.getNomeacoes(); }),
  criarBotao('desistentes', (controller) => { controller.getIndeferidosEDesistentes(); }),
  criarBotao('estatisticas', (controller) => { controller.getEstatisticasGerais(); }),
  // criarBotao("usuario",(controller) =>{ controller.getU}),
  criarBotao('prazo', (controller) => { controller.getPorPrazo(); }),
];

/*= =========================================LOGICA DA VIEW============================================ */
// usa-se o metodo toggle para ativar animacoes dos elementos e mudar o estado da view, adicionando e removendo classes
function toggleClasses(selectedElement, unselectedElements) {
  unselectedElements.forEach((e) => {
    if (e.nome !== selectedElement.nome) {
      document.getElementById(e.nome).classList.remove('active');
    }
    document.getElementById(selectedElement.nome).classList.add('active');
  });
}
/* ----------------------------------------query elements factory-------------------------------------*/
function criarElementoAprovado(aprovado, nomeLista) {
  return { nome: aprovado.usuario_nome, posicao: aprovado[`${nomeLista}`] };
}
/*---------------------------------------------------------------------------------------------------*/

// Funcao provisoria ate conectar o nginx à aplicacao;
async function setToken() {
  const login = 571_294_525;
  const senha = '1234';

  await USER_CONTROLLER.criarSessao(login, senha)
    .then((o) => {
      sessionStorage.setItem(TOKEN_NAME, o.token);
    }).catch((e) => {
      console.log(e);
    });
}

async function init() {
  STATS.forEach((e) => {
    document
      .getElementById(e.nome).onclick(() => {
        e.acao(STATS_CONTROLLER);
        toggleClasses(e, STATS);
      });
  });

  QUERY.forEach((e) => {
    document.getElementById(e.nome)
      .onclick(() => {
        e.acao(QUERY_CONTROLLER);
        toggleClasses(e, QUERY);
      });
  });

  await setToken();
}

init();

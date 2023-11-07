

/*--------------------------------modelos e controladores------------------*/



class StatsController{
  constructor(){
    this.model = new StatsModel();
  }

  async getNomeacoes(){
    return this.model.nomeacoes();
  }

  async getIndeferidosEDesistentes(){
    return this.model.desistentesEIndeferidos();
  }

  async getEstatisticasGerais(){
    return this.model.estatisticasGerais();
  }

  async getPorPrazo(){
    return this.model.porPrazo();
  }
}


class StatsModel{
  constructor(){
    this.baseUrl = "http://localhost:3002";
  }

  async nomeacoes(){
    //console.log("controller stats nomeacoes");
    return { stats:[{},{},{}], message: "dummy nomeacoes, nao esta implementato ainda"}
  }

  async desistentesEIndeferidos(){
    return { stats:[{},{},{}], message: "dummy desistentes, nao esta implementato ainda"}
    //console.log("controller stats indeferidos e desistentes");
  }

  async estatisticasGerais(){
    return { stats:[{},{},{}], message: "dummy gerais, nao esta implementato ainda"}
    //console.log("controller stats estatisticas gerais");
  }

  async porPrazo(){
    return { stats:[{},{},{}], message: "dummy por prazo, nao esta implementato ainda"}
    //console.log("controller stats prazo");
  }
}

class QueryModel{
  constructor(){
    this.url = "http://localhost:3002/usuario";
  }

  async tresParaUm(candidatos,pagina,token){
    const url = `${this.url}/listar-tres/?candidatos=${candidatos}&pagina=${pagina}`;

    return await fetch(url,{ headers: { Authorization: `Bearer ${token}`}})
      .then(async (ok) =>{
          return await  ok.json().then(async (o) =>{
            return { ok: true, aprovados: o.aprovados }
          })
          .catch(async (e) =>{
            return { ok: false, aprovados: []};
          })
      })
      .catch(async (e) =>{
        return { ok: false, aprovados: []};
      });
  }

  async quatroParaUm(candidatos,pagina,token){
    const url = `${this.url}/listar-quatro/?candidatos=${candidatos}&pagina=${pagina}`;

    return await fetch(url,{ headers: { Authorization: `Bearer ${token}`}})
      .then(async (ok) =>{
          return await  ok.json().then(async (o) =>{
            return { ok: true, aprovados: o.aprovados }
          })
          .catch(async (e) =>{
            return { ok: false, aprovados: []};
          })
      })
      .catch(async (e) =>{
        return { ok: false, aprovados: []};
      });
  }

  async pcd(candidatos,pagina,token){
    const url = `${this.url}/listar-pcd/?candidatos=${candidatos}&pagina=${pagina}`;
    return await fetch(url,{ headers: { Authorization: `Bearer ${token}`}})
      .then(async (ok) =>{
          return await  ok.json().then(async (o) =>{
            return { ok: true, aprovados: o.aprovados }
          })
          .catch(async (e) =>{
            return { ok: false, aprovados: []};
          })
      })
      .catch(async (e) =>{
        return { ok: false, aprovados: []};
      });
  }

  async ppp(candidatos,pagina,token){
    const url = `${this.url}/listar-ppp/?candidatos=${candidatos}&pagina=${pagina}`;
    return await fetch(url,{ headers: { Authorization: `Bearer ${token}`}})
      .then(async (ok) =>{
          return await  ok.json().then(async (o) =>{
            return { ok: true, aprovados: o.aprovados }
          })
          .catch(async (e) =>{
            return { ok: false, aprovados: []};
          })
      })
      .catch(async (e) =>{
        return { ok: false, aprovados: []};
      });
  }

  async ampla(candidatos,pagina,token){
    const url = `${this.url}/listar-todos/?candidatos=${candidatos}&pagina=${pagina}`;

    return await fetch(url,{ headers: { Authorization: `Bearer ${token}`}})
      .then(async (ok) =>{
          return await  ok.json().then(async (o) =>{
            return { ok: true, message: "resultados retornados com sucesso!",aprovados: o.aprovados }
          })
          .catch(async (e) =>{
            return { ok: false, message: "Erro de consulta!",aprovados: []}
          })
      })
      .catch(async (e) =>{
        return { ok: false, message: "Erro de consulta!",aprovados: []}
      });
      
  }
}

class QueryController{
  constructor(){
    this.model = new QueryModel();
  }

  async getListaTresParaUm(aprovados,pagina,token){
    return await this.model.tresParaUm(aprovados,pagina,token);
  }

  async getListaQuatroParaUm(aprovados,pagina,token){
    return await this.model.quatroParaUm(aprovados,pagina, token);
  }

  async getListaPCD(aprovados,pagina,token){
    return await this.model.pcd(aprovados,pagina,token);
  }

  async getListaPPP(aprovados,pagina,token){
    return await this.model.ppp(aprovados,pagina,token);
  }

  async getListaAmpla(aprovados,pagina,token){
    return await this.model.ampla(aprovados,pagina,token);
  }
}


class UserController{
  constructor(){
    this.model = new UserModel();
  }

  async authenticateUser(login,senha){
    await this.model.ativarConta(login,senha);
  }

  async ativarConta(login,senha){
    await this.model.ativarConta(login,senha);
  }

  async atualizarSenha(login,senha,novaSenha){
    await this.model.atualizarSenha(login,senha,novaSenha);
  }
  
  async criarSessao(login,senha){
    return await this.model.criarSessao(login,senha);
  }
}

class UserModel{
  constructor(){
    this.url = "http://localhost:3002/usuario"
    this.resposes = {
       
    };
  }

  async ativarConta(login,senha){
    const url = `${this.url}/listar-todos/?candidatos=${login}&pagina=${senha}`;
    await fetch(url)
      .then((resolve) =>{
      }).catch((err) =>{
      });
  }

  async atualizarSenha(login,senha,novaSenha){
    const url = `${this.url}/atualizar-senha`;
    await fetch(url,{ 
      headers: { Authorization: `Bearer ${ token }`},
      body: { login, senha, novaSenha }
    })
      .then((resolve) =>{
      })
      .catch((err) =>{
      });
  }
  
  async criarSessao(login,senha){

    const url = `${this.url}/criar-sessao`;
    const sessionHeader= new Headers();

    sessionHeader.append("Content-Type","application/json");


    return await fetch(url,{ 
      method: "POST",
      headers: sessionHeader,
      body: JSON.stringify({ login, senha }),
    })
    .then(async (resolve) =>{
      return await resolve.json()
        .then((res) => { 
          return { ok: true, message: " ", token: res.token };
        })
        .catch(async (err) => {
          return { ok: false, message: "falha de autenticacao"};
        });
    })
    .catch(async(e) => {
      return { ok: false, message: "falha de autenticacao"};
    })
  }
}

/*-----------------------------------implementacao da logica---------------------------------------------*/

const STATS = [
    criarBotao("nomeacoes",(controller) =>{ controller.getNomeacoes()} ),
    criarBotao("desistentes",(controller) =>{ controller.getIndeferidosEDesistentes() }),
    criarBotao("estatisticas",(controller) =>{ controller.getEstatisticasGerais() }),
    //criarBotao("usuario",(controller) =>{ controller.getU}),
    criarBotao("prazo",(controller) =>{ controller.getPorPrazo() }),
];

const QUERY = [
  criarBotao("lista-3-1",async (controller) =>{ 
    const queryResult = await  controller.getListaTresParaUm(40,0,sessionStorage.getItem(TOKEN_NAME)) 
    //TODO:: alterar quando reconfigurar o servico de 3-1
    //TODO:: if is ok... 
    const queryMap = queryResult.aprovados.map((e) => criarElementoAprovado(e,"usuario_posicaoAmpla") );
    console.log(queryMap);
    loadQueryResults(queryResult.ok,queryMap);
  }),
    criarBotao("lista-4-1",async (controller) =>{ 
    //TODO:: alterar quando reconfigurar o servico de 4-1
    const queryResult = await  controller.getListaQuatroParaUm(40,0,sessionStorage.getItem(TOKEN_NAME)) 
    //TODO:: if is ok... 
    const queryMap = queryResult.aprovados.map((e) => criarElementoAprovado(e,"usuario_posicaoAmpla"));
    loadQueryResults(queryResult.ok,queryMap);
  }),
  criarBotao("lista-pcd",async (controller) =>{ 
    const queryResult = await    controller.getListaPCD(40,0,sessionStorage.getItem(TOKEN_NAME)) 
    //TODO:: if is ok... 
    const queryMap = queryResult.aprovados.map((e) => criarElementoAprovado(e,"usuario_posicaoPCD"));
    loadQueryResults(queryResult.ok,queryMap);
  }),
  criarBotao("lista-ppp",async (controller) =>{ 
    const queryResult = await controller.getListaPPP(40,0,sessionStorage.getItem(TOKEN_NAME)) 
    //TODO:: if is ok... 
    const queryMap = queryResult.aprovados.map((e) => criarElementoAprovado(e,"usuario_posicaoPPP"));
    loadQueryResults(queryResult.ok,queryMap);
  }),
  criarBotao("lista-ampla",async (controller) =>{ 
    const queryResult = await controller.getListaAmpla(40,0,sessionStorage.getItem(TOKEN_NAME));
    //TODO:: if is ok... 
    const queryMap = queryResult.aprovados.map((e) => criarElementoAprovado(e,"usuario_posicaoAmpla"));
    loadQueryResults(queryResult.ok,queryMap);
  }),
];

const USUARIO = [
];

/*==========================================LOGICA DA VIEW============================================*/
//usa-se o metodo toggle para ativar animacoes dos elementos e mudar o estado da view, adicionando e removendo classes
function toggleClasses(selectedElement,unselectedElements){
  unselectedElements.forEach((e) => { 
    if (e.nome !== selectedElement.nome){
      document.getElementById(e.nome).classList.remove("active");
    };
    document.getElementById(selectedElement.nome).classList.add("active");
  })
}
/*------------------------------------------general elements factory----------------------------------*/

//inserir um novo parametro 
function criarBotao(nome,acao){ 
  return { nome, acao } 
}

/*----------------------------------------query elements factory-------------------------------------*/
function criarElementoAprovado(aprovado,nomeLista){ 
  return { nome: aprovado.usuario_nome, posicao: aprovado[`${nomeLista}`] };
}
/*---------------------------------------------------------------------------------------------------*/

function loadQueryResults(ok,results){
  if(ok){
    const wrapper = document.getElementById("dashboard-query-results-wrapper");
    wrapper.innerHTML = '';

    results.forEach((e) => {
      //wrapper
      console.log(e);
      const { nome, posicao } = e;
      console.log(nome);
      console.log(posicao);

      const result = document.createElement("div");
      result.classList.add('dashboard-query-result');
      //name 
      const name = document.createElement("div");
      name.classList.add('dashboard-query-result-name');
      name.innerHTML = nome;
      //main position 
      const position = document.createElement("div");
      position.classList.add('dashboard-query-result-position');
      position.innerHTML = posicao;

      result.appendChild(name);
      result.appendChild(position);

      wrapper.appendChild(result);
    })
  }
  console.log("chamado no fim");
}

const TOKEN_NAME = "user-token";

const STATS_MODEL = new StatsModel();
const QUERY_MODEL = new QueryModel();
const USER_MODEL = new UserModel();

const STATS_CONTROLLER = new StatsController();
const QUERY_CONTROLLER = new QueryController();
const USER_CONTROLLER = new UserController();

//Funcao provisoria ate conectar o nginx `a` aplicacao;
async function setToken(){
  const login = 571_294_525;
  const senha = "1234";

  await USER_CONTROLLER.criarSessao(login,senha)
    .then((o) => { 
      sessionStorage.setItem(TOKEN_NAME,o.token);
    }).catch((e) => { 
      console.log(e)
    });
}

async function init(){
    STATS.forEach((e) => document.getElementById(e.nome).onclick = () => { e.acao(STATS_CONTROLLER); toggleClasses(e,STATS)});
    QUERY.forEach((e) => document.getElementById(e.nome).onclick = () => { e.acao(QUERY_CONTROLLER); toggleClasses(e,QUERY)});
    await setToken();
}

init()




import { DataSource } from "typeorm"
import { Aprovado } from '../../modules/Aprovado/entity/Aprovado'
import { Lista } from '../../modules/Lista/entity/Lista'
import { Situacao } from '../../modules/Situacao/entity/Situacao'
import { TipoLista } from '../../modules/TipoLista/entity/TipoLista';
import { Lotacao } from '../../modules/Lotacao/entity/Lotacao'
import { Turma } from '../../modules/Turma/entity/Turma'
import { Cidade } from '../../modules/Cidade/entity/Cidade'
import { Diretoria } from '../../modules/Diretoria/entity/Diretoria'
import { LotadoEm } from "@modules/LotadoEm/entity/LotadoEm";


export const myDataSource = new DataSource({
  "type":"postgres",
  "host":"localhost",
  "port":5432,
  "username":"postgres",
  "password":"docker",
  "database":"aprovados_bb",
  "synchronize": true,
  //NAO MUDAR
  "entities":[
    "./src/modules/**/entity/*.ts"
  ],
  //NAO MUDAR
  "migrations":[
    "./src/shared/typeorm/migrations/*.ts"
  ]
});


myDataSource.initialize()
  .then(async () => {
    //run migrations with e
    //insert data with e
    //kill database with e await runAfterInit();
    console.log("initialized properly")
  })
  .catch((e) =>{
    console.log(`${e}`)
  })
  .finally(async () => {
    await runAfterInit();
    console.log("called after database connection")
  });

async function runAfterInit(){
}

/*
async function loadDOUData(){
  const AMPLA = require('../../../dados_dos_candidatos/src/diretas.json');
  const CADASTRO_RESERVA = require('../../../dados_dos_candidatos/src/cadastroReserva.json');

  Promise.all([
    cadastrarTurma([1,2,3]),
    cadastrarTipoLista([ 
      'ampla',
      'ampla_diretas',
      'ampla_cadastro_reserva',
      'ppp', 
      'ppp_diretas', 
      'ppp_cadastro_reserva', 
      'pcd', 
      'pcd_diretas', 
      'pcd_cadastro_reserva', 
      'tres_para_um', 
      'quatro_para_um', 
    ]),
    cadastrarSituacao([
      'em_preparacao',
      'convocacao_expedida',
      'em_qualificacao',
      'qualificado',
      'empossado',
      'desistente',
      'cancelado_por_prazo',
      'inapto_ou_outros_motivos',
      'nao_convocado',
      'fila_de_espera'
    ]),
      cadastrarCidade(['Sao Paulo', 'Brasilia']),
      cadastrarDiretoria(['DITEC','UAN','UCF']),
   
      cadastrarAprovados(AMPLA,"fila_de_espera",true),
      cadastrarAprovados(CADASTRO_RESERVA,"fila_de_espera",true),
  ]).then(async () => {
      /*
    await cadastrarLotacao([
        { cidade: 'Sao Paulo', diretoria: 'DITEC', unidade: 1},
        { cidade: 'Brasilia', diretoria: 'DITEC', unidade: 1},
        { cidade: 'Brasilia', diretoria: 'DITEC', unidade: 2},
        { cidade: 'Brasilia', diretoria: 'DITEC', unidade: 3},
        { cidade: 'Brasilia', diretoria: 'UAN', unidade: 1},
        { cidade: 'Brasilia', diretoria: 'UCF', unidade: 1},
    ]),

    //vagas da ampla
      await cadastrarLista(CADASTRO_RESERVA,"ampla","ppp","pcd");
      await cadastrarLista(AMPLA,"ampla","ppp","pcd");

    //vagas das diretas
    await cadastrarLista(AMPLA,"ampla_diretas","ppp_diretas","pcd_diretas");
    //vagas do cr
    //await cadastrarLista(CADASTRO_RESERVA,"ampla_cadastro_reserva","ppp_cadastro_reserva","pcd_cadastro_reserva");
    CADASTRO_RESERVA.forEach((e:IAprovado) => AMPLA.push(e));

    //await cadastrarListaTresParaUm(AMPLA,"tres_para_um");
    //await cadastrarListaQuatroParaUm(AMPLA,"quatro_para_um");
    const lotacoes: ILotacao[] = [
        { cidade: 'Sao Paulo', diretoria: 'DITEC', unidade: 1},
        { cidade: 'Brasilia', diretoria: 'DITEC', unidade: 1},
        { cidade: 'Brasilia', diretoria: 'DITEC', unidade: 2},
        { cidade: 'Brasilia', diretoria: 'DITEC', unidade: 3},
        { cidade: 'Brasilia', diretoria: 'UAN', unidade: 1},
        { cidade: 'Brasilia', diretoria: 'UCF', unidade: 1},
      ];
    await cadastrarLotadosEm(AMPLA.map((v: IAprovado) => {
      const {cidade, diretoria, unidade } = lotacoes[Math.floor(Math.random() * 6)]
      return { inscricao: v.inscricao, cidade, diretoria, unidade } 
    }));

  }).catch((err) => {
      console.log(`Error!:\n${err}`)
  });
}

  //como os dados estao consistentes vou fingir que typescript nao existe
interface IAprovado{
  inscricao: number,
  nome: string,
  senha: string,
  posicaoAmpla: number
  posicaoPPP: number
  posicaoPCD: number
}

interface ILotacao{
  cidade: string,
  diretoria: string,
  unidade: number,
}

interface ILotadoEm{
  inscricao: number,
  cidade: string,
  diretoria: string,
  unidade: number,
}

async function cadastrarTipoLista(lista: string[]){
  lista.forEach(async (l: string) => {
    const tipoLista = myDataSource.manager.create(TipoLista);
    tipoLista.tipo =  l;
    await myDataSource.manager.save(tipoLista);
  });
}


async function cadastrarTurma(turmas: number[]){
  turmas.forEach(async (l: number) => {
    const turma = myDataSource.manager.create(Turma);
    turma.numero = l;
    await myDataSource.manager.save(turma);
  });
}


async function cadastrarCidade(cidades: string[]){
  cidades.forEach(async (c: string) => {
    const cidade = myDataSource.manager.create(Cidade);
    cidade.nome = c;
    await myDataSource.manager.save(cidade);
  });
}

async function cadastrarDiretoria(diretorias: string[]){
  diretorias.forEach(async (d: string) => {
    const diretoria = myDataSource.manager.create(Diretoria);
    diretoria.nome = d;
    await myDataSource.manager.save(diretoria);
  });
}


async function cadastrarSituacao(situacoes: string[]){
  situacoes.forEach(async (e: string) => {
    const situacao = myDataSource.manager.create(Situacao);
      situacao.nome = e;
      await myDataSource.manager.save(situacao);
  })
}

async function cadastrarAprovados(
  aprovados: IAprovado[],
  situacao: string = "fila_de_espera",
  mock: boolean = false,
  mockTurmas: number[] = [1,2,3],
){
  aprovados.forEach(async (apr: IAprovado) => {

    const aprovado = myDataSource.manager.create(Aprovado);
    aprovado.inscricao = apr.inscricao;
    aprovado.nome = apr.nome;
    aprovado.senha = apr.senha;
    aprovado.situacao = situacao;
    aprovado.ppp = apr.posicaoPPP !== null;
    aprovado.pcd = apr.posicaoPCD !== null;
    if(mock){
      aprovado.turma = mockTurmas[Math.floor(Math.random() * 3)]
    }

    await myDataSource.manager.save(aprovado);
  });
}
//como os dados estao consistentes vou fingir que typescript nao existe


//como os dados estao consistentes vou fingir que typescript nao existe
async function cadastrarLista(aprovados: IAprovado[],tipoAmpla: string,tipoPPP: string,tipoPCD: string){

  const salvarAprovado = async (a: IAprovado,posicao: number ,tipoLista: string) => { 
    const lista = myDataSource.manager.create(Lista);
    lista.inscricao = a.inscricao;
    lista.tipo = tipoLista;
    lista.posicao = posicao;
    await myDataSource.manager.save(lista);
  };

  aprovados.forEach( async (apr) =>{
    await salvarAprovado(apr,apr.posicaoAmpla,tipoAmpla);

    if(apr.posicaoPPP !== null){
      await salvarAprovado(apr,apr.posicaoPPP,tipoPPP);
    }
    if(apr.posicaoPCD !== null){
      await salvarAprovado(apr,apr.posicaoPCD,tipoPCD);
    }
  });
}

            
      
async function cadastrarLotacao(lotacoes: ILotacao[]){

  lotacoes.forEach(async (v) => {
    const lotacao = myDataSource.getRepository(Lotacao).create();
    lotacao.cidade = v.cidade;
    lotacao.diretoria = v.diretoria;
    lotacao.unidade = v.unidade;
    await myDataSource.getRepository(Lotacao).save(lotacao);
  })
}

async function cadastrarLotadosEm(lotados: ILotadoEm[]){
  lotados.forEach(async (v) => {
    const lotadoEm = myDataSource.getRepository(LotadoEm).create();
    lotadoEm.cidade = v.cidade ;
    lotadoEm.diretoria = v.diretoria;
    lotadoEm.unidade = v.unidade;
    lotadoEm.inscricao = v.inscricao;
    await myDataSource.manager.save(lotadoEm);
  })
}

async function cadastrarListaTresParaUm(lista: IAprovado[],nomeLista: string){

  const bubbleSort = (arr: any[],key:string) => {
    
    let ordered = false;

    while(!ordered){
      ordered = true;
      for(let i = 1; i < arr.length; i++){
        //key is the name of the hashmap key
        if(arr[i][key] < arr[i - 1][key]){
          const swap = arr[i];
          arr[i] = arr[i - 1];
          arr[i - 1 ] = swap;
          ordered = false;
        } 
      }
    }
  }

  const listaAmpla = lista.filter((e) => { return e.posicaoPCD === null && e.posicaoPPP === null });
  const listaPPP = lista.filter((e) => { return e.posicaoPCD === null && e.posicaoPPP !== null });
  const listaPCD = lista.filter((e) => { return e.posicaoPCD !== null && e.posicaoPPP === null });

  const listaPCDPPP = lista.filter((e) => { return e.posicaoPCD !== null && e.posicaoPPP !== null });
  listaPCDPPP.forEach((v:IAprovado) => {
    if(v.posicaoPCD > v.posicaoPPP){
      listaPCD.push(v);
    } else {
      listaPPP.push(v);
    }
  })
  //acoplamento alto

bubbleSort(listaPPP,"posicaoPPP");
  bubbleSort(listaPCD,"posicaoPCD");
  bubbleSort(listaAmpla,"posicaoAmpla");

  const salvarAprovado = async (lst: IAprovado[], position: number,counter: number, lName: string) => { 
    let i = 0;
    while(i < counter){
        if(lst.length > 0){
          const lista = myDataSource.manager.create(Lista);
          lista.inscricao = lst[0].inscricao;
          lista.tipo = lName;
          lista.posicao = position + i;
          await myDataSource.manager.save(lista);
          lst.splice(0,1);
        }
        i++;
      }
    };

  let listCount = 1;

  while(listaAmpla.length > 0 || listaPPP.length > 0 || listaPCD.length > 0){
      await salvarAprovado(listaAmpla,listCount,3,nomeLista);
      listCount+=3;
      await salvarAprovado(listaPPP,listCount,1,nomeLista);
      listCount++;
      await salvarAprovado(listaPCD,listCount,1,nomeLista);
      listCount++;
  }
}

async function cadastrarListaQuatroParaUm(lista: IAprovado[],nomeLista: string){

  const bubbleSort = (arr: any[],key:string) => {
    
    let ordered = false;

    while(!ordered){
      ordered = true;
      for(let i = 1; i < arr.length; i++){
        //key is the name of the hashmap key
        if(arr[i][key] < arr[i - 1][key]){
          const swap = arr[i];
          arr[i] = arr[i - 1];
          arr[i - 1 ] = swap;
          ordered = false;
        } 
      }
    }
  }

  const listaAmpla = lista.filter((e) => { return e.posicaoPCD === null && e.posicaoPPP === null });
  const listaPPP = lista.filter((e) => { return e.posicaoPCD === null && e.posicaoPPP !== null });
  const listaPCD = lista.filter((e) => { return e.posicaoPCD !== null && e.posicaoPPP === null });

  const listaPCDPPP = lista.filter((e) => { return e.posicaoPCD !== null && e.posicaoPPP !== null });
  listaPCDPPP.forEach((v:IAprovado) => {
    if(v.posicaoPCD > v.posicaoPPP){
      listaPCD.push(v);
    } else {
      listaPPP.push(v);
    }
  })
  //acoplamento alto

  bubbleSort(listaPPP,"posicaoPPP");
  bubbleSort(listaPCD,"posicaoPCD");
  bubbleSort(listaAmpla,"posicaoAmpla");

  const salvarAprovado = async (lst: IAprovado[], position: number,counter: number, lName: string) => { 
    let i = 0;
    while(i < counter){
        if(lst.length > 0){
          const lista = myDataSource.manager.create(Lista);
          lista.inscricao = lst[0].inscricao;
          lista.posicao = position + i;
          lista.tipo = lName;
          await myDataSource.manager.save(lista);
          lst.splice(0,1);
        }
        i++;
      }
    };

  let listCount = 1;

  while(listaAmpla.length > 0 || listaPPP.length > 0 || listaPCD.length > 0){
    
    if(listaPPP.length > 0){
      await salvarAprovado(listaAmpla,listCount,3,nomeLista);
      listCount+=3;
      await salvarAprovado(listaPCD,listCount,1,nomeLista);
      listCount++;

    } else {
      await salvarAprovado(listaAmpla,listCount,4,nomeLista);
      listCount+=4;
    }

    await salvarAprovado(listaPPP,listCount,1,nomeLista);
    listCount++;
  }
}



*/




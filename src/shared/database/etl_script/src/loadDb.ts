import { TipoLista } from "../../../../modules/TipoLista/entity/TipoLista";
import { Turma } from "../../../../modules/Turma/entity/Turma";
import { Cidade } from "../../../../modules/Cidade/entity/Cidade";
import { Diretoria } from "../../../../modules/Diretoria/entity/Diretoria";
import { Situacao } from "../../../../modules/Situacao/entity/Situacao";
import { Aprovado } from "../../../../modules/Aprovado/entity/Aprovado";
import { Lista } from "../../../../modules/Lista/entity/Lista";
import { LotadoEm } from "../../../../modules/LotadoEm/entity/LotadoEm";
import { myDataSource } from "../../../typeorm";
import { Lotacao } from "../../../../modules/Lotacao/entity/Lotacao";

import path from "path";
import { TurmasRepo } from "../../../../modules/Turma/repository/TurmaRepository";


  //const AMPLA = require('/src/shared/database/etl_script/src/data/diretas.json/diretas.json');
  //const CADASTRO_RESERVA = require('shared/database/etl_script/src/data/diretas.json/cadastroReserva.json');
  const AMPLA: IAprovado[ ]= require(path.join(__dirname,'..','data','diretas.json'));
  const CADASTRO_RESERVA: IAprovado[] = require(path.join(__dirname,'..','data','cadastroReserva.json')); //const CADASTRO_RESERVA = require('./src/shared/database/etl_script/src/data/diretas.json/cadastroReserva.json');
  const TODOS_OS_APROVADOS = AMPLA.concat(CADASTRO_RESERVA);


  //const AMPLA = require('../data/diretas.json/diretas.json');
  //const CADASTRO_RESERVA = require('../data/cadastroReserva.json');
  const LOTACOES = [{ cidade: 'Sao Paulo', diretoria: 'DITEC', unidade: 1},
        { cidade: 'Brasilia', diretoria: 'DITEC', unidade: 1},
        { cidade: 'Brasilia', diretoria: 'DITEC', unidade: 2},
        { cidade: 'Brasilia', diretoria: 'DITEC', unidade: 3},
        { cidade: 'Brasilia', diretoria: 'UAN', unidade: 1},
        { cidade: 'Brasilia', diretoria: 'UCF', unidade: 1}]




async function loadDOUData(
    cTurma: Promise<void> = cadastrarTurma([1,2,3]),
    cTipoLista: Promise<void> = cadastrarTipoLista([ 
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
    cSituacao: Promise<void> = cadastrarSituacao([
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
      cCidade: Promise<void> = cadastrarCidade(['Sao Paulo', 'Brasilia']),
      cDiretoria: Promise<void> = cadastrarDiretoria(['DITEC','UAN','UCF']),
   

      cAprovadosAmpla: Promise<void> = cadastrarAprovados(TODOS_OS_APROVADOS,"fila_de_espera",true),
      cLotacao: Promise<void> =  cadastrarLotacao(LOTACOES),
      cListaAmplaDiretas: Promise<void> = cadastrarLista(CADASTRO_RESERVA,"ampla","ppp","pcd"),
      cListaAmplaCR : Promise<void> = cadastrarLista(AMPLA,"ampla","ppp","pcd"),
      cListaDiretas: Promise<void> = cadastrarLista(AMPLA,"ampla_diretas","ppp_diretas","pcd_diretas"),
      cListaCR: Promise<void> = cadastrarLista(CADASTRO_RESERVA,"ampla_cadastro_reserva","ppp_cadastro_reserva","pcd_cadastro_reserva"),
      cListaTresParaUm: Promise<void> = cadastrarListaTresParaUm(TODOS_OS_APROVADOS,"tres_para_um"),
      cListaQuatroParaUm: Promise<void> = cadastrarListaQuatroParaUm(TODOS_OS_APROVADOS,"quatro_para_um"),

      cLotadosEm: Promise<void> = cadastrarLotadosEm(TODOS_OS_APROVADOS.map((v: IAprovado) => {
          const {cidade, diretoria, unidade } = LOTACOES[Math.floor(Math.random() * 6)]
        return { inscricao: v.inscricao, cidade, diretoria, unidade } 
      })),


){

  if(!myDataSource.isInitialized){
    await myDataSource.initialize();
  }

  console.log("is this freaking script calling something or no??");
  
  //each tier must load before it is safe to run the tier below 
  const tierOne = [cTurma,cTipoLista,cSituacao,cCidade,cDiretoria].filter((e) => { e !== null && e !== undefined});
  const tierTwo = [cAprovadosAmpla, cLotacao, cListaAmplaDiretas,cListaAmplaCR,cListaDiretas, cListaCR, cListaTresParaUm,cListaQuatroParaUm].filter((e) => { e !== null && e !== undefined});
  const tierThree = [cLotadosEm].filter((e) => { e !== null && e !== undefined});
  
  await Promise.all(tierOne).then(async (e) => {
    await Promise.all(tierTwo).then(async (e) => {
      await Promise.all(tierThree).then((e) => {
        console.log("aparentemente deu certo e escolhi deixar essas promisses em forma de seta pq ficou bonito, e a nossa vida indo p frente \n#QUEMTAONNOBB?")
      }).catch((e) => {console.log("NINGUEEEM ACERRTOUU")})
    }).catch((e) => console.log("ERROOOOOU"))
  }).catch((e) => console.log("ERROU"))

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
    const tipoLista = TurmasRepo.manager.create(TipoLista);

    tipoLista.tipo =  l;
    await myDataSource.manager.save(tipoLista);
  });
}


async function cadastrarTurma(turmas: number[]){
  turmas.forEach(async (l: number) => {
    const turma = myDataSource.getRepository(Turma).create();

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
  console.log(aprovados[0]);
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

/*
async function cadastrarListaCR(aprovados: IAprovado[],tipoAmpla: string,tipoPPP: string,tipoPCD: string){

  const salvarAprovado = async (a: IAprovado,posicao: number, tipoLista: string) => { 
    const lista = myDataSource.manager.create(Lista);
    lista.inscricao = a.inscricao;
    lista.tipoLista = tipoLista;
    lista.posicao = posicao;
    await myDataSource.manager.save(lista);
  };

  aprovados.forEach( async (apr) =>{


    await salvarAprovado(apr,crAmpla,tipoAmpla);

    if(apr.posicaoPPP !== null){
      await salvarAprovado(apr,crPPP,tipoPPP);
    }
    if(apr.posicaoPCD !== null){
      await salvarAprovado(apr,tipoPCD);
    }
  });
}
*/

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
    const lotacao = myDataSource.manager.create(Lotacao);
    lotacao.cidade = v.cidade;
    lotacao.diretoria = v.diretoria;
    lotacao.unidade = v.unidade;
    await myDataSource.manager.save(lotacao);
  })
}

async function cadastrarLotadosEm(lotados: ILotadoEm[]){
  lotados.forEach(async (v) => {
    const lotadoEm = myDataSource.manager.create(LotadoEm);
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
          const lista = myDataSource.manager.create(Lista)
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

myDataSource.initialize().then(async (e) => {
  
  await loadDOUData().then((e) => {
    
    console.log("called on resolve")
  })
});



//loadDOUData().then((e) => console.log("Data was properly loaded!")).catch((err) => { console.log("something went wrong in the process!")}).finally(() =>{console.log("wtf is going on??")} );


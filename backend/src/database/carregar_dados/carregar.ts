import 'reflect-metadata';
import { 
  AprovadoRepo,
  CidadeRepo,
  DiretoriaRepo,
  EstadoRepo,
  LotacaoRepo,
  SituacaoRepo,
  TurmaRepo,
  TipoRankingRepo,
  RankingRepo
} from "../ORM/repositorio/exporter";
import dataSource from "../config";

import path from "path";
import { Ranking }from '../ORM/modelo/exporter';

//TODO:: criar o tipo no diretorio depois
type TipoAprovado = { 
  inscricao: number,
  nome: string,
  senha: string,
  cadastroReserva: boolean,
  posicaoAmpla: number,
  posicaoPPP: number,
  posicaoPCD: number,
}

type TipoRanking = {
  inscricao: number,
  posicao: number,
  tipo: string,
}

//TODO:: passar tudo para o SSOT depois
const ARQUIVO_DIRETAS = require(path.join(__dirname,'..','..','..','dados_dos_aprovados','diretas.json'));
const ARQUIVO_CR = require(path.join(__dirname,'..','..','..','dados_dos_aprovados','cadastroReserva.json'));

const DIRETAS: TipoAprovado[] = ARQUIVO_DIRETAS;
const CADASTRO_RESERVA : TipoAprovado[] = ARQUIVO_CR
const TODOS_OS_APROVADOS: TipoAprovado[] = [...DIRETAS,...CADASTRO_RESERVA];


const LISTA_AMPLA_COMPLETA: TipoRanking[] = TODOS_OS_APROVADOS 
  .map((a) => {
    return { inscricao: a.inscricao,posicao: a.posicaoAmpla,tipo: 'lista_ampla_completa'}
  });

const LISTA_AMPLA_DIRETAS: TipoRanking[] = DIRETAS
  .map((a) => {
    return { inscricao: a.inscricao,posicao: a.posicaoAmpla,tipo: 'lista_ampla_diretas'}
  });

const LISTA_AMPLA_CR : TipoRanking[]= CADASTRO_RESERVA
  .filter((a) => a.posicaoPCD !== null)
  .map((a) => {
    return { inscricao: a.inscricao,posicao: a.posicaoAmpla,tipo: 'lista_ampla_cr'}
  });

const LISTA_PPP_COMPLETA : TipoRanking[]= TODOS_OS_APROVADOS
  .filter((a) => a.posicaoPPP !== null)
  .map((a) => { 
    return { inscricao: a.inscricao,posicao: a.posicaoPPP,tipo: 'lista_ppp_completa'}
  });

const LISTA_PPP_DIRETAS : TipoRanking[]= DIRETAS 
  .filter((a) => a.posicaoPPP !== null)
  .map((a) => {
    return { inscricao: a.inscricao, posicao: a.posicaoPPP,tipo: 'lista_ppp_diretas'}
  });

const LISTA_PPP_CR : TipoRanking[]= CADASTRO_RESERVA
  .filter((a) => a.posicaoPPP !== null)
  .map((a) => {
    try{ return { inscricao: a.inscricao,posicao: a.posicaoPPP,tipo: 'lista_ppp_cr'} } catch(e){ throw(e)}
  });

const LISTA_PCD_COMPLETA : TipoRanking[]= TODOS_OS_APROVADOS
  .filter((a) => a.posicaoPCD !== null )
  .map((a) => {
  return { inscricao: a.inscricao, posicao: a.posicaoPCD,tipo: 'lista_pcd_completa'}
  });

const LISTA_PCD_DIRETAS : TipoRanking[]= DIRETAS
  .filter((a) => a.posicaoPCD !== null )
  .map((a) => {
    return { inscricao: a.inscricao,posicao: a.posicaoPCD,tipo: 'lista_pcd_diretas'}
  });

const LISTA_PCD_CR : TipoRanking[]= CADASTRO_RESERVA
  .filter((a) => a.posicaoPCD !== null)
  .map((a) => {
    return { inscricao: a.inscricao,posicao: a.posicaoPCD,tipo: 'lista_pcd_cr'}
  });

const LISTA_ORDENADA_DE_CONVOCACAO : TipoRanking[]= gerarListaDeConvocacao();

function gerarListaDeConvocacao(
  listaCompleta: TipoAprovado[] = TODOS_OS_APROVADOS
): TipoRanking[]{

  //ordena as listas conforme a posicao do aprovado;
  const todos = listaCompleta.sort((a,b) => a.posicaoAmpla - b.posicaoAmpla );
  //os classificados na ampla sao todas as pessoas entre os primeiros 1500

  const ampla = todos.filter((a) => a.posicaoAmpla <= 1500 && a.posicaoPCD !== null );
  //PPP sao todos os que nao estao entre os 1500 primeiros e atendem a condicao de PPP
  const ppp = todos.filter((a) => a.posicaoAmpla > 1500 && a.posicaoPPP !== null);
  //PCD sao todos os que nao estao entre os 1500 primeiros e atendem a condicao de PCD
  const pcd = todos.filter((a) => a.posicaoPCD !== null);

  let i_ampla = 1, i_ppp = 1, i_pcd = 1;
  let listaOrdenada: TipoRanking[] = [];

  while (ampla.length > 0|| ppp.length > 0|| pcd.length > 0){
    const amplaUm = { inscricao: ampla[0].inscricao,posicao: i_ampla,tipo: 'lista_de_chamada'};
    i_ampla += 1;ampla.splice(0,1);
    console.log(ampla[0]);
    const amplaDo = { inscricao: ampla[0].inscricao,posicao: i_ampla,tipo: 'lista_de_chamada'};
    i_ampla += 1;ampla.splice(0,1);
    const amplaTr = {inscricao: ampla[0].inscricao,posicao:i_ampla,tipo:'lista_de_chamada'}
    i_ampla += 1;ampla.splice(0,1);

    const pppUm = { inscricao: ppp[0].inscricao,posicao: i_ppp,tipo: 'lista_de_chamada'};
    i_ppp += 1;ppp.splice(0,1);
    const pcdUm = { inscricao: pcd[0].inscricao,posicao: i_pcd,tipo: 'lista_de_chamada'}
    i_pcd += 1;pcd.splice(0,1);

    listaOrdenada.push(amplaUm);
    listaOrdenada.push(amplaDo);
    listaOrdenada.push(amplaTr);
    listaOrdenada.push(pppUm);
    listaOrdenada.push(pcdUm);
  }

  return listaOrdenada;
};

const CIDADES = [
  ['Sao Paulo','SP'],
  ['Brasilia','DF']
]
const DIRETORIAS = [
  'DITEC','UAN','UDF'
]
const SITUACOES = [
  'fila_de_espera',
  'em_preparacao',
  'convocacao_autorizada',
  'convocacao_expedida',
  'em_qualificacao',
  'qualificado',
  'empossado',
  'desistente',
  'cancelado_por_prazo',
  'inapto_outros_motivos',
  'nao_convocado',
]
const ESTADOS = [
  'SP','DF'
]
const LOTACOES = [
  ['DITEC','Sao Paulo','SP'],
  ['DITEC','Brasilia', 'DF'],
  ['UAN','Brasilia','DF'],
  ['UDF','Brasilia','DF'],
]

const TURMAS = [1,2,3];
const TIPOS_RANKING = [
  'ampla_concorrencia',
  'diretas',
  'cadastro_reserva',

  'lista_ppp_completa',
  'lista_ppp_diretas',
  'lista_ppp_cr',

  'lista_pcd_completa',
  'lista_pcd_diretas',
  'lista_pcd_cr',

  'lista_de_chamada'
];


async function carregarEstados(
  estados: string[] = ESTADOS
): Promise<void>{

    for await (const e of estados){
      await EstadoRepo.cadastrarEstado(e)
        .catch((e) => { throw(`\n\nerro no carregamento dos Estados:\n${e}`)})
    }
}

async function carregarCidades(
  cidades: string[][] = CIDADES
){
    for await (const [cidade,estado] of cidades){
      await CidadeRepo.cadastrarCidade(cidade,estado)
        .catch( e => { throw(`\n\nErro no carregamento das cidades:\n${e}`)})
    }
}

async function carregarDiretorias(
  diretorias: string[] = DIRETORIAS
){

  for await (const diretoria of diretorias){
    await DiretoriaRepo.cadastrarDiretoria(diretoria)
      .catch( e => { throw(`\n\nErro no carregamento das diretorias:\n${e}`) })
  }
}

async function carregarLotacao(
  lotacoes: string[][] = LOTACOES
){
    for await (const[diretoria, cidade, estado] of lotacoes){
      await LotacaoRepo.cadastrarLotacao(diretoria,cidade,estado)
        .catch((e) => { throw(`\n\nErro no carregamento das lotacoes:\n${e}`)})
    }

}

async function carregarLotadoEm(
  lotacoes: string[][] = [] 
){
}

async function carregarSituacao(
  situacoes: string[] = SITUACOES
){

    for await (const situacao of situacoes){
      await SituacaoRepo.cadastrarSituacao(situacao)
        .catch((e) => { throw(`\n\nErro no carregamento dasa situacoes:\n${e}`)})
  }
}

async function carregarTurma(
  turmas: number[] = TURMAS
){
  for await (const turma of turmas){
    await TurmaRepo.cadastrarTurma(turma)
      .catch((e) => { throw(`\n\nErro no carregamento das turmas:\n${e}`)})
  }
}

async function carregarTipoRanking(
  tiposDeRanking: string[] = TIPOS_RANKING
){
  for await (const tipo of tiposDeRanking){
      await TipoRankingRepo.cadastrarTipoRanking(tipo)
        .catch((e) => { throw(`error:\n${e}`)})
  }
}

async function carregarAprovados(
  aprovados: TipoAprovado[] = TODOS_OS_APROVADOS 
){

  for await (const a of aprovados){
    await AprovadoRepo.cadastrarAprovado(a.inscricao,a.nome,a.senha,"fila_de_espera",1,false)
      .catch((e) => { throw(`\n\nErro no carregamento dos aprovados:\n${e}`)})
  }
}

async function carregarRanking(
  aprovados: TipoRanking[]
){
  for await (const a of aprovados){
    await RankingRepo.cadastrarRanking(a.inscricao,a.posicao,a.tipo)
      .catch((e) => { throw(`\n\nErro no carregamento dos aprovados:\n${e}`)})
  }
}

async function carregarDados(){
  const camadaUm = Promise.all([
    await carregarEstados(),
    await carregarDiretorias(),
    await carregarSituacao(),
    await carregarTipoRanking(),
    await carregarTurma(),
  ]);

  const camadaDois = Promise.all([
    await carregarCidades(),
    await carregarAprovados()
  ]);

  const camadaTres = Promise.all([
    await carregarLotacao(),
  ]);

  const camadaQuatro = Promise.all([

    await carregarRanking(LISTA_AMPLA_COMPLETA),
    await carregarRanking(LISTA_AMPLA_DIRETAS),
    await carregarRanking(LISTA_AMPLA_CR),

    await carregarRanking(LISTA_PPP_COMPLETA),
    await carregarRanking(LISTA_PPP_DIRETAS),
    await carregarRanking(LISTA_PPP_CR),

    //await carregarRanking(LISTA_PCD_COMPLETA),
    await carregarRanking(LISTA_PCD_DIRETAS),
    await carregarRanking(LISTA_PCD_CR),

    await carregarRanking(LISTA_ORDENADA_DE_CONVOCACAO),
  ]);

  await camadaUm.then(async () => { 
    await camadaDois.then( async () =>{
      await camadaTres.then( async () => {
        await camadaQuatro.then(async () =>{
           () =>{ console.log("HADOOUUUKEN!!")};
        })
      })
    }).catch(e => { throw(e)})
  }).catch(e => { throw(e) });

}

async function executar(){
  if(!dataSource.isInitialized){
    await dataSource.initialize().then(async () => await carregarDados()).catch((e) => console.log(e))
  } else {
    await carregarDados();
  }
}

executar().then(() => console.log("Dados devidamente carregados!")).catch((e) => console.log(`ERRO!:\n${e}`))

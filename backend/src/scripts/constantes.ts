
import path from "path";

//TODO:: criar o tipo no diretorio depois
import { TipoAprovado,TipoRanking } from './tiposScript'
import { valoresPadrao } from "../SSOT/base_de_dados/exporter";
//TODO:: passar tudo para o SSOT depois
const ARQUIVO_DIRETAS = require(path.join(__dirname,'..','..','dados_dos_aprovados','diretas.json'));
const ARQUIVO_CR =      require(path.join(__dirname,'..','..','dados_dos_aprovados','cadastroReserva.json'));

const DIRETAS: TipoAprovado[] = ARQUIVO_DIRETAS;
const CADASTRO_RESERVA : TipoAprovado[] = ARQUIVO_CR
export const TODOS_OS_APROVADOS: TipoAprovado[] = [...DIRETAS,...CADASTRO_RESERVA];



export const LISTA_COMPLETA: TipoRanking[] = TODOS_OS_APROVADOS 
  .map((a) => {
    return { posicaoAmpla: a.posicaoAmpla,posicaoRanking: a.posicaoAmpla,tipo: valoresPadrao.TipoRanking.ListaCompleta}
  });

export const LISTA_COMPLETA_DIRETAS: TipoRanking[] = DIRETAS
  .map((a) => {
    return { posicaoAmpla: a.posicaoAmpla,posicaoRanking: a.posicaoAmpla,tipo: valoresPadrao.TipoRanking.ListaCompletaDiretas}
  });

export const LISTA_COMPLETA_CR: TipoRanking[]= CADASTRO_RESERVA
  .map((a) => {
    return { posicaoAmpla: a.posicaoAmpla,posicaoRanking: a.posicaoAmpla,tipo: valoresPadrao.TipoRanking.ListaCompletaCR}
  });

export const LISTA_AMPLA_COMPLETA: TipoRanking[] = TODOS_OS_APROVADOS 
  .filter((a) => ( !a.posicaoPPP && !a.posicaoPCD ) || (a.posicaoPPP && a.posicaoAmpla <= 1500  && !a.posicaoPCD))
  .map((a) => {
    return { posicaoAmpla: a.posicaoAmpla,posicaoRanking: a.posicaoAmpla,tipo: valoresPadrao.TipoRanking.AmplaCompleta}
  });

export const LISTA_AMPLA_DIRETAS: TipoRanking[] = DIRETAS
  .filter((a) => ( !a.posicaoPPP && !a.posicaoPCD ) || (a.posicaoPPP && a.posicaoAmpla <= 1500  && !a.posicaoPCD))
  .map((a) => {
    return { posicaoAmpla: a.posicaoAmpla,posicaoRanking: a.posicaoAmpla,tipo: valoresPadrao.TipoRanking.AmplaDiretas }
  });

export const LISTA_AMPLA_CR : TipoRanking[]= CADASTRO_RESERVA
  .filter((a) => ( !a.posicaoPPP && !a.posicaoPCD ))
  .map((a) => {
    return { posicaoAmpla: a.posicaoAmpla,posicaoRanking: a.posicaoAmpla,tipo: valoresPadrao.TipoRanking.AmplaCR}
  });

export const LISTA_PPP_COMPLETA : TipoRanking[]= TODOS_OS_APROVADOS
  .filter((a) => a.posicaoPPP !== null && a.posicaoAmpla > 1500 )
  .map((a) => { 
    return { posicaoAmpla: a.posicaoAmpla,posicaoRanking: a.posicaoPPP,tipo: valoresPadrao.TipoRanking.PPPCompleta}
  });

export const LISTA_PPP_DIRETAS : TipoRanking[]= DIRETAS 
  .filter((a) => a.posicaoPPP !== null && a.posicaoAmpla > 1500 && a.posicaoPCD === null)
  .map((a) => {
    return { posicaoAmpla: a.posicaoAmpla, posicaoRanking: a.posicaoPPP,tipo: valoresPadrao.TipoRanking.PPPDiretas }
  });

export const LISTA_PPP_CR : TipoRanking[]= CADASTRO_RESERVA
  .filter((a) => a.posicaoPPP !== null)
  .map((a) => {
    return { posicaoAmpla: a.posicaoAmpla,posicaoRanking: a.posicaoPPP,tipo: valoresPadrao.TipoRanking.PPPCR} 
  });

export const LISTA_PCD_COMPLETA : TipoRanking[]= TODOS_OS_APROVADOS
  .filter((a) => a.posicaoPCD !== null )
  .map((a) => {
  return { posicaoAmpla: a.posicaoAmpla, posicaoRanking: a.posicaoPCD,tipo: valoresPadrao.TipoRanking.PCDCompleta}
  });

export const LISTA_PCD_DIRETAS : TipoRanking[]= DIRETAS
  .filter((a) => a.posicaoPCD !== null )
  .map((a) => {
    return { posicaoAmpla: a.posicaoAmpla ,posicaoRanking: a.posicaoPCD,tipo: valoresPadrao.TipoRanking.PCDDiretas }
  });

export const LISTA_PCD_CR : TipoRanking[]= CADASTRO_RESERVA
  .filter((a) => a.posicaoPCD !== null)
  .map((a) => {
    return { posicaoAmpla: a.posicaoAmpla ,posicaoRanking: a.posicaoPCD,tipo: valoresPadrao.TipoRanking.PCDCR}
  });

export const LISTA_ORDENADA_DE_CONVOCACAO : TipoRanking[]= [
  ...gerarListaDeConvocacao(DIRETAS,1),
  ...gerarListaDeConvocacao(CADASTRO_RESERVA,DIRETAS.length),
]

export const LISTA_ORDENADA_DE_CONVOCACAO_2: TipoRanking[]= [
  ...gerarListaDeConvocacao2(DIRETAS,1),
  ...gerarListaDeConvocacao2(CADASTRO_RESERVA,DIRETAS.length),
]


function gerarListaDeConvocacao2(
  listaCompleta: TipoAprovado[],
  i: number
): TipoRanking[]{
  const I_INICIAL = i;

  //ordena as listas conforme a posicao do aprovado;
  const todos = listaCompleta.sort((a,b) => {
    return a.posicaoAmpla < b.posicaoAmpla ? -1 : a.posicaoAmpla > b.posicaoAmpla ? 1 : 0;
  });
  //os classificados na ampla sao todas as pessoas entre os primeiros 1500


  const ampla = todos.filter((a) => {
    const pppAmpla = a.posicaoAmpla <= 1500 && a.posicaoPPP !== null && a.posicaoPCD === null;
    const pAmpla = a.posicaoPPP === null && a.posicaoPCD === null;

    return pppAmpla || pAmpla;
  });
  //PPP sao todos os que nao estao entre os 1500 primeiros e atendem a condicao de PPP
  const ppp = todos.filter((a) => a.posicaoAmpla > 1500 && a.posicaoPPP !== null && a.posicaoPCD === null );
  //PCD sao todos os que nao estao entre os 1500 primeiros e atendem a condicao de PCD
  const pcd = todos.filter((a) => a.posicaoPCD !== null);
  
  //let i = 1;
  let listaOrdenada: TipoRanking[] = [];

  const inserir = (arrayRemocao: TipoAprovado[], arrayInsercao: TipoRanking[],posicaoRanking: number,tipo: string) => {
    if( arrayRemocao.length > 0) {
      const pessoa = { 
        posicaoAmpla: arrayRemocao[0].posicaoAmpla,
        posicaoRanking,
        tipo  
      };
      i += 1;arrayRemocao.splice(0,1); arrayInsercao.push(pessoa);
    }
  }

  const INDEX = 1015
  while (ampla.length > 0|| ppp.length > 0|| pcd.length > 0){
    //coisa horrorosa
    if( i < INDEX ){
      //  meu deus
      if( i < INDEX ){ inserir(ampla,listaOrdenada,i,valoresPadrao.TipoRanking.ListaDeChamada2)}
      if( i < INDEX ){ inserir(ppp,listaOrdenada,i,valoresPadrao.TipoRanking.ListaDeChamada2)  }
      if( i < INDEX ){ inserir(pcd,listaOrdenada,i,valoresPadrao.TipoRanking.ListaDeChamada2)  }
      if( i < INDEX ){ inserir(ampla,listaOrdenada,i,valoresPadrao.TipoRanking.ListaDeChamada2)}
      if( i < INDEX ){ inserir(ampla,listaOrdenada,i,valoresPadrao.TipoRanking.ListaDeChamada2)}
    } else {
      inserir(ampla,listaOrdenada,i,valoresPadrao.TipoRanking.ListaDeChamada2);
      inserir(ampla,listaOrdenada,i,valoresPadrao.TipoRanking.ListaDeChamada2);
      inserir(ampla,listaOrdenada,i,valoresPadrao.TipoRanking.ListaDeChamada2);
      inserir(ampla,listaOrdenada,i,valoresPadrao.TipoRanking.ListaDeChamada2);
      inserir(ppp,listaOrdenada,i,valoresPadrao.TipoRanking.ListaDeChamada2);
    }
    
  }

  return listaOrdenada;
};


function gerarListaDeConvocacao(
  listaCompleta: TipoAprovado[],
  i: number
): TipoRanking[]{

  //ordena as listas conforme a posicao do aprovado;
  const todos = listaCompleta.sort((a,b) => {
    return a.posicaoAmpla < b.posicaoAmpla ? -1 : a.posicaoAmpla > b.posicaoAmpla ? 1 : 0;
  });
  //os classificados na ampla sao todas as pessoas entre os primeiros 1500


  const ampla = todos.filter((a) => {
    const pppAmpla = a.posicaoAmpla <= 1500 && a.posicaoPPP !== null && a.posicaoPCD === null;
    const pAmpla = a.posicaoPPP === null && a.posicaoPCD === null;

    return pppAmpla || pAmpla;
  });
  //PPP sao todos os que nao estao entre os 1500 primeiros e atendem a condicao de PPP
  const ppp = todos.filter((a) => a.posicaoAmpla > 1500 && a.posicaoPPP !== null && a.posicaoPCD === null );
  //PCD sao todos os que nao estao entre os 1500 primeiros e atendem a condicao de PCD
  const pcd = todos.filter((a) => a.posicaoPCD !== null);
  
  //let i = 1;
  let listaOrdenada: TipoRanking[] = [];

  while (ampla.length > 0|| ppp.length > 0|| pcd.length > 0){
    //primeiro ampla
    if(ampla.length > 0){
      const amplaUm = { 
        posicaoAmpla: ampla[0].posicaoAmpla,
        posicaoRanking: i,
        tipo: valoresPadrao.TipoRanking.ListaDeChamada
      };
      i += 1;ampla.splice(0,1); listaOrdenada.push(amplaUm)
    }
    //primeiro pcd 
    if(pcd.length > 0){
      const pcdUm = { 
        posicaoAmpla: pcd[0].posicaoAmpla,
        posicaoRanking: i,
        tipo: valoresPadrao.TipoRanking.ListaDeChamada 
      }
      i += 1;pcd.splice(0,1);
      listaOrdenada.push(pcdUm);
    }
    //primeiro ppp
    if(ppp.length > 0){
      const pppUm = { 
        posicaoAmpla: ppp[0].posicaoAmpla,
        posicaoRanking: i,
        tipo: valoresPadrao.TipoRanking.ListaDeChamada
      };
      i += 1;ppp.splice(0,1);
      listaOrdenada.push(pppUm);
    }
    //segundo ampla
    if(ampla.length > 0){
      const amplaDo = { 
        posicaoAmpla: ampla[0].posicaoAmpla,
        posicaoRanking: i,
        tipo: valoresPadrao.TipoRanking.ListaDeChamada
      };
      i += 1;ampla.splice(0,1);
      listaOrdenada.push(amplaDo);
    }
    //terceiro ampla
    if(ampla.length > 0){
      const amplaTr = {
        posicaoAmpla: ampla[0].posicaoAmpla,
        posicaoRanking: i,
        tipo: valoresPadrao.TipoRanking.ListaDeChamada
      }
      i += 1;ampla.splice(0,1);
      listaOrdenada.push(amplaTr);
    }
  }

  return listaOrdenada;
};

export enum TiposCidades{
  'Sao Paulo',
  'Brasilia'
}

export const CIDADES = [
  ['Sao Paulo','SP'],
  ['Brasilia','DF']
]

export enum TiposDiretorias{
  'DITEC', 'UAN','UCF'
}

export const DIRETORIAS = [
  'DITEC','UAN','UCF'
]
export const SITUACOES = [
  //valoresPadrao.Situacao.FilaDeEspera,
  valoresPadrao.Situacao.EmPreparacao, 
  valoresPadrao.Situacao.ConvocacaoAutorizada,
  valoresPadrao.Situacao.ConvocacaoExpedida, 
  valoresPadrao.Situacao.EmQualificacao,
  valoresPadrao.Situacao.Qualificado,
  valoresPadrao.Situacao.Empossado,
  valoresPadrao.Situacao.Desistente,
  valoresPadrao.Situacao.CanceladoPorPrazo,
  valoresPadrao.Situacao.Inapto,
  valoresPadrao.Situacao.NaoConvocado,
];

export enum TiposEstado{
  'SP','DF'
}

export const ESTADOS = [
  'SP','DF'
]

export const LOTACOES = [
  ['DITEC','Sao Paulo','SP'],
  ['DITEC','Brasilia', 'DF'],
  ['UAN','Brasilia','DF'],
  ['UCF','Brasilia','DF'],
]

export const TURMAS = Array(100).fill(0).map((_,i) => i);

export const SITUACAO_PADRAO = 'nao_convocado';

export const TIPOS_RANKING = [
  valoresPadrao.TipoRanking.ListaCompleta,
  valoresPadrao.TipoRanking.ListaCompletaDiretas,
  valoresPadrao.TipoRanking.ListaCompletaCR,

  valoresPadrao.TipoRanking.AmplaCompleta,
  valoresPadrao.TipoRanking.AmplaDiretas,
  valoresPadrao.TipoRanking.AmplaCR,

  valoresPadrao.TipoRanking.PCDCompleta,
  valoresPadrao.TipoRanking.PCDDiretas,
  valoresPadrao.TipoRanking.PCDCR,
   
  valoresPadrao.TipoRanking.PPPCompleta,
  valoresPadrao.TipoRanking.PPPDiretas,
  valoresPadrao.TipoRanking.PPPCR,
];



//-------------------------------------------------------

export const SITUACAO_APROVADOS = require(path.join(__dirname,'..','..','dados_dos_aprovados','situacaoAprovados.json'));


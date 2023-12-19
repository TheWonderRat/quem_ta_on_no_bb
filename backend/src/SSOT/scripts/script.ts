
import path from "path";

//TODO:: criar o tipo no diretorio depois

import { TipoAprovado,TipoRanking } from '../../tipos/exporter'
//TODO:: passar tudo para o SSOT depois
const ARQUIVO_DIRETAS = require(path.join(__dirname,'..','..','..','dados_dos_aprovados','diretas.json'));
const ARQUIVO_CR =      require(path.join(__dirname,'..','..','..','dados_dos_aprovados','cadastroReserva.json'));

const DIRETAS: TipoAprovado[] = ARQUIVO_DIRETAS;
const CADASTRO_RESERVA : TipoAprovado[] = ARQUIVO_CR
export const TODOS_OS_APROVADOS: TipoAprovado[] = [...DIRETAS,...CADASTRO_RESERVA];

enum TiposLista{
  ListaAmplaCompleta= 'lista_ampla_completa',
  ListaAmplaDiretas = 'lista_ampla_diretas',
  ListaAmplaCR = 'lista_ampla_cr',

  ListaPPPCompleta = 'lista_ppp_completa',
  ListaPPPDIretas = 'lista_ppp_diretas',
  ListaPPPCR = 'lista_ppp_cr',

  ListaPCDCompleta = 'lista_pcd_completa',
  ListaPCDDiretas = 'lista_pcd_diretas',
  ListaPCDCR = 'lista_pcd_cr',

  ListaDeChamada = 'lista_de_chamada'
};


export const LISTA_AMPLA_COMPLETA: TipoRanking[] = TODOS_OS_APROVADOS 
  .map((a) => {
    return { posicaoAmpla: a.posicaoAmpla,posicaoRanking: a.posicaoAmpla,tipo: TiposLista.ListaAmplaCompleta}
  });

export const LISTA_AMPLA_DIRETAS: TipoRanking[] = DIRETAS
  .map((a) => {
    return { posicaoAmpla: a.posicaoAmpla,posicaoRanking: a.posicaoAmpla,tipo: TiposLista.ListaAmplaDiretas}
  });

export const LISTA_AMPLA_CR : TipoRanking[]= CADASTRO_RESERVA
  .map((a) => {
    return { posicaoAmpla: a.posicaoAmpla,posicaoRanking: a.posicaoAmpla,tipo: TiposLista.ListaAmplaCR }
  });

export const LISTA_PPP_COMPLETA : TipoRanking[]= TODOS_OS_APROVADOS
  .filter((a) => a.posicaoPPP !== null)
  .map((a) => { 
    return { posicaoAmpla: a.posicaoAmpla,posicaoRanking: a.posicaoPPP,tipo: TiposLista.ListaPPPCompleta}
  });

export const LISTA_PPP_DIRETAS : TipoRanking[]= DIRETAS 
  .filter((a) => a.posicaoPPP !== null)
  .map((a) => {
    return { posicaoAmpla: a.posicaoAmpla, posicaoRanking: a.posicaoPPP,tipo: TiposLista.ListaPPPDIretas}
  });

export const LISTA_PPP_CR : TipoRanking[]= CADASTRO_RESERVA
  .filter((a) => a.posicaoPPP !== null)
  .map((a) => {
    return { posicaoAmpla: a.posicaoAmpla,posicaoRanking: a.posicaoPPP,tipo: TiposLista.ListaPPPCR} 
  });

export const LISTA_PCD_COMPLETA : TipoRanking[]= TODOS_OS_APROVADOS
  .filter((a) => a.posicaoPCD !== null )
  .map((a) => {
  return { posicaoAmpla: a.posicaoAmpla, posicaoRanking: a.posicaoPCD,tipo: TiposLista.ListaPCDCompleta}
  });

export const LISTA_PCD_DIRETAS : TipoRanking[]= DIRETAS
  .filter((a) => a.posicaoPCD !== null )
  .map((a) => {
    return { posicaoAmpla: a.posicaoAmpla ,posicaoRanking: a.posicaoPCD,tipo: TiposLista.ListaPCDDiretas}
  });

export const LISTA_PCD_CR : TipoRanking[]= CADASTRO_RESERVA
  .filter((a) => a.posicaoPCD !== null)
  .map((a) => {
    return { posicaoAmpla: a.posicaoAmpla ,posicaoRanking: a.posicaoPCD,tipo: TiposLista.ListaPCDCR}
  });

export const LISTA_ORDENADA_DE_CONVOCACAO : TipoRanking[]= gerarListaDeConvocacao();

function gerarListaDeConvocacao(
  listaCompleta: TipoAprovado[] = TODOS_OS_APROVADOS
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
  
  let i = 1;
  let listaOrdenada: TipoRanking[] = [];


  while (ampla.length > 0|| ppp.length > 0|| pcd.length > 0){
    //primeiro ampla
    if(ampla.length > 0){
      const amplaUm = { 
        posicaoAmpla: ampla[0].posicaoAmpla,
        posicaoRanking: i,
        tipo: TiposLista.ListaDeChamada
      };
      i += 1;ampla.splice(0,1); listaOrdenada.push(amplaUm)
    }
    //primeiro pcd 
    if(pcd.length > 0){
      const pcdUm = { 
        posicaoAmpla: pcd[0].posicaoAmpla,
        posicaoRanking: i,
        tipo: TiposLista.ListaDeChamada
      }
      i += 1;pcd.splice(0,1);
      listaOrdenada.push(pcdUm);
    }
    //primeiro ppp
    if(ppp.length > 0){
      const pppUm = { 
        posicaoAmpla: ppp[0].posicaoAmpla,
        posicaoRanking: i,
        tipo: TiposLista.ListaDeChamada
      };
      i += 1;ppp.splice(0,1);
      listaOrdenada.push(pppUm);
    }
    //segundo ampla
    if(ampla.length > 0){
      const amplaDo = { 
        posicaoAmpla: ampla[0].posicaoAmpla,
        posicaoRanking: i,
        tipo: TiposLista.ListaDeChamada
      };
      i += 1;ampla.splice(0,1);
      listaOrdenada.push(amplaDo);
    }
    //terceiro ampla
    if(ampla.length > 0){
      const amplaTr = {
        posicaoAmpla: ampla[0].posicaoAmpla,
        posicaoRanking: i,
        tipo:TiposLista.ListaDeChamada
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

export const SITUACAO_PADRAO = 'fila_de_espera';

export const TIPOS_RANKING = [
  TiposLista.ListaAmplaCompleta,
  TiposLista.ListaAmplaDiretas ,
  TiposLista.ListaAmplaCR,

  TiposLista.ListaPPPCompleta,
  TiposLista.ListaPPPDIretas,
  TiposLista.ListaPPPCR, 

  TiposLista.ListaPCDCompleta,
  TiposLista.ListaPCDDiretas, 
  TiposLista.ListaPCDCR,
  TiposLista.ListaDeChamada
];


//-------------------------------------------------------

export const SITUACAO_APROVADOS = require(path.join(__dirname,'..','..','..','dados_dos_aprovados','situacaoAprovados.json'));






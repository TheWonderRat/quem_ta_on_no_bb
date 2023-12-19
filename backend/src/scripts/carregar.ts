//TODO:: criar ferramenta de linha de comando para insercao dos dados
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
} from "../database/ORM/repositorio/exporter";
import dataSource from "../database/config";

import { atributosScript } from "../SSOT/exporter"
import { TipoAprovado, TipoRanking } from '../tipos/exporter';
import { GerenciadorDeSenha } from '../compartilhados/utilitarios/exporter';

async function carregarEstados(
  estados: string[] = atributosScript.ESTADOS
): Promise<void>{

    for await (const estado of estados){
      await EstadoRepo.cadastrarEstado(estado)
        .catch((e) => { throw(`\n\nerro no carregamento dos Estados:\n${e}`)})
    }
}

async function carregarCidades(
  cidades: string[][] = atributosScript.CIDADES
){
    for await (const [cidade,estado] of cidades){
      await CidadeRepo.cadastrarCidade(cidade,estado)
        .catch( e => { throw(`\n\nErro no carregamento das cidades:\n${e}`)})
    }
}

async function carregarDiretorias(
  diretorias: string[] = atributosScript.DIRETORIAS
){

  for await (const diretoria of diretorias){
    await DiretoriaRepo.cadastrarDiretoria(diretoria)
      .catch( e => { throw(`\n\nErro no carregamento das diretorias:\n${e}`) })
  }
}

async function carregarLotacao(
  lotacoes: string[][] = atributosScript.LOTACOES
){
    for await (const[diretoria, cidade, estado] of lotacoes){
      await LotacaoRepo.cadastrarLotacao(diretoria,cidade,estado)
        .catch((e) => { throw(`\n\nErro no carregamento das lotacoes:\n${e}`)})
    }

}

async function carregarSituacao(
  situacoes: string[] = atributosScript.SITUACOES
){

    for await (const situacao of situacoes){
      await SituacaoRepo.cadastrarSituacao(situacao)
        .catch((e) => { throw(`\n\nErro no carregamento dasa situacoes:\n${e}`)})
  }
}

async function carregarTurma(
  turmas: number[] = atributosScript.TURMAS
){
  for await (const turma of turmas){
    await TurmaRepo.cadastrarTurma(turma)
      .catch((e) => { throw(`\n\nErro no carregamento das turmas:\n${e}`)})
  }
}

async function carregarTipoRanking(
  tiposDeRanking: string[] = atributosScript.TIPOS_RANKING
){
  for await (const tipo of tiposDeRanking){
      await TipoRankingRepo.cadastrarTipoRanking(tipo)
        .catch((e) => { throw(`error:\n${e}`)})
  }
}

async function carregarAprovados(
  aprovados: TipoAprovado[] = atributosScript.TODOS_OS_APROVADOS 
){

  for await (const a of aprovados){
    const senha = await GerenciadorDeSenha.criptografarSenha(a.posicaoAmpla.toString());

    await AprovadoRepo.cadastrarAprovado(
      a.posicaoAmpla,
      a.nome,
      senha,
      atributosScript.SITUACAO_PADRAO,
      a.posicaoPPP !== null,
      a.posicaoPCD !== null,
      false,
    )
      .catch((e) => { throw(`\n\nErro no carregamento dos aprovados:\n${e}`)})
  }
}

async function carregarRanking(
  aprovados: TipoRanking[]
){
  for await (const a of aprovados){
    await RankingRepo.cadastrarRanking(a.posicaoAmpla,a.posicaoRanking,a.tipo)
      .catch((e) => { throw(`\n\nErro no carregamento dos rankings:\n${e}`)})
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
    await carregarRanking(atributosScript.LISTA_AMPLA_COMPLETA),
    await carregarRanking(atributosScript.LISTA_AMPLA_DIRETAS),
    await carregarRanking(atributosScript.LISTA_AMPLA_CR),

    await carregarRanking(atributosScript.LISTA_PPP_COMPLETA),
    await carregarRanking(atributosScript.LISTA_PPP_DIRETAS),
    await carregarRanking(atributosScript.LISTA_PPP_CR),

    await carregarRanking(atributosScript.LISTA_PCD_COMPLETA),
    await carregarRanking(atributosScript.LISTA_PCD_DIRETAS),
    await carregarRanking(atributosScript.LISTA_PCD_CR),

    await carregarRanking(atributosScript.LISTA_ORDENADA_DE_CONVOCACAO),
  ]);

  await camadaUm.then(async () => { 
    await camadaDois.then( async () =>{
      await camadaTres.then( async () => {
        await camadaQuatro.then(async () =>{
           console.log("HADOOUUUKEN!!")
        })
      })
    }).catch(e => { throw(e)})
  }).catch(e => { throw(e) });
}

async function executar(){
  if(!dataSource.isInitialized){
    await dataSource.initialize()
      .then(async () => 
        await carregarDados()
    ).catch((e) => 
      console.log(e)
    )
  } else {
    await carregarDados();
  }
}
executar().then(() => console.log("Dados devidamente carregados!")).catch((e) => console.log(`ERRO!:\n${e}`))



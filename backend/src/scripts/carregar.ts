//  TODO:: criar ferramenta de linha de comando para insercao dos dados
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
  RankingRepo,
  LotadoEmRepo,
} from '../database/ORM/repositorio/exporter';
import {
  Estado,
  Diretoria,
  Lotacao,
  Situacao,
  Aprovado,
  Ranking,
} from '../database/ORM/modelo/exporter';
import dataSource from '../database/config';

import { atributosScript } from '../SSOT/exporter';
import { TipoAprovado, TipoRanking, TipoSituacao } from '../tipos/exporter';
import { SITUACAO_APROVADOS } from '../SSOT/scripts/script';

async function carregarEstados(
  estados: string[] = atributosScript.ESTADOS,
): Promise<void> {
  const est: Estado[] = estados.map((e) => EstadoRepo.criarEstado(e));
  await EstadoRepo.insert(est);
}

async function carregarCidades(
  cidades: string[][] = atributosScript.CIDADES,
): Promise<void> {
  const cds = cidades.map(([c, e]) => CidadeRepo.criarCidade(c, e));
  await CidadeRepo.insert(cds);
}

async function carregarDiretorias(
  diretorias: string[] = atributosScript.DIRETORIAS,
): Promise<void> {
  const dts: Diretoria[] = diretorias.map((d) => DiretoriaRepo.criarDiretoria(d));
  await DiretoriaRepo.insert(dts);
}

async function carregarLotacao(
  lotacoes: string[][] = atributosScript.LOTACOES,
): Promise<void> {
  const ltc: Lotacao[] = lotacoes.map(([d, c, e]) => LotacaoRepo.criarLotacao(d, c, e));
  await LotacaoRepo.insert(ltc);
}

async function carregarSituacao(
  situacoes: string[] = atributosScript.SITUACOES,
): Promise<void> {
  const sts: Situacao[] = situacoes.map((s) => SituacaoRepo.criarSituacao(s));
  await SituacaoRepo.insert(sts);
}

async function carregarTurma(
  turmas: number[] = atributosScript.TURMAS,
): Promise<void> {
  const tms = turmas.map((t) => TurmaRepo.criarTurma(t));
  await TurmaRepo.insert(tms);
}

async function carregarTipoRanking(
  tiposDeRanking: string[] = atributosScript.TIPOS_RANKING,
): Promise<void> {
  const trks = tiposDeRanking.map((t) => TipoRankingRepo.criarTipoRanking(t));
  await TipoRankingRepo.insert(trks);
}

async function carregarAprovados(
  aprovados: TipoAprovado[] = atributosScript.TODOS_OS_APROVADOS,
): Promise<void> {
  const aprs: Aprovado[] = aprovados.map((a) =>
    AprovadoRepo.criarAprovado(
      a.posicaoAmpla,
      a.inscricao,
      a.nome,
      a.senha,
      atributosScript.SITUACAO_PADRAO,
      a.posicaoPPP !== null,
      a.posicaoPCD !== null,
      false,
    ));

  await AprovadoRepo.save(aprs);
}

async function carregarRanking(
  aprovados: TipoRanking[],
): Promise<void> {
  const rks: Ranking[] = aprovados.map((a) => RankingRepo.criarRanking(
    a.posicaoAmpla,
    a.posicaoRanking,
    a.tipo,
  ));
  await RankingRepo.insert(rks);
}

async function atualizarAprovado(
  situacoes: TipoSituacao[] = SITUACAO_APROVADOS,
): Promise<void> {
  const aprovados: Aprovado[] = [];

  for await (const st of situacoes) {
    const a = await AprovadoRepo.buscarPorPosicaoAmpla(st.posicao);
    if (a) {
      a.situacao = st.situacao;
      a.turma = st.turma;
      aprovados.push(a);
    } else {
      throw `A posicao do candidato ${st.posicao} nao existe no bd`;
    }
  }
  await AprovadoRepo.save(aprovados);
}

async function atualizarLotacao(
  situacoes: TipoSituacao[] = SITUACAO_APROVADOS,
): Promise<void> {
  const sts = situacoes
    .filter((s) => s.diretoria && s.cidade)
    .map((s) => {
      //  problematico se houvesse mais de uma cidade...
      //  problematiso se nao fosse o filter...
      const estado = s.cidade === 'Brasilia' ? 'DF' : 'SP';
      return LotadoEmRepo.criarLotadoEm(s.diretoria!!, s.posicao, s.cidade!!, estado);
    });

  await LotadoEmRepo.insert(sts);
}

async function carregarDados(): Promise<void> {
  const camadaUm = Promise.all([
    await carregarEstados(),
    await carregarDiretorias(),
    await carregarSituacao(),
    await carregarTipoRanking(),
    await carregarTurma(),
  ]);
  const camadaDois = Promise.all([
    await carregarCidades(),
    await carregarAprovados(),
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

  const camadaCinco = Promise.all([
    await atualizarAprovado(),
    await atualizarLotacao(),
  ]);

  await camadaUm.then(async () => {
    await camadaDois.then(async () => {
      await camadaTres.then(async () => {
        await camadaQuatro.then(async () => {
          await camadaCinco.then(async () => {
            console.log('HADOOUUUKEN!!');
          }).catch((e) => { throw e; });
        }).catch((e) => { throw e; });
      }).catch((e) => { throw e; });
    }).catch((e) => { throw e; });
  }).catch((e) => { throw e; });
}

async function executar(): Promise<void> {
  if (!dataSource.isInitialized) {
    await dataSource.initialize()
      .then(async () => {
        await carregarDados()
          .catch((e) => {
            throw e;
          });
      })
      .catch((e) => {
        console.log(e);
      });
  } else {
    await carregarDados()
      .then(() => {
        console.log('properly loaded data!');
      })
      .catch((e) => {
        console.log(e);
      });
  }
}

executar()
  .then(() => {
    console.log('Dados devidamente carregados!');
  })
  .catch((e) => {
    console.log(`ERRO!:\n${e}`);
  });

import dataSource from '../database/config';
import AprovadoRepo from '../database/ORM/repositorio/AprovadoRepo';
import LotadoEmRepo from '../database/ORM/repositorio/LotadoEmRepo';

import { TipoSituacao } from '../tipos/exporter';
import { SITUACAO_APROVADOS } from '../SSOT/scripts/script';
import { Aprovado } from '../database/ORM/modelo/exporter';

async function atualizarAprovado(
  situacoes: TipoSituacao[],
): Promise<void> {
  let aprovados: Aprovado[] = [];

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
  situacoes: TipoSituacao[],
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

async function carregarDados(
  data: TipoSituacao[] = SITUACAO_APROVADOS,
): Promise<void> {
  await atualizarAprovado(data).catch((e) => { throw e; });
  await atualizarLotacao(data).catch((e) => { throw e; });
}

async function executar():Promise<void> {
  if (!dataSource.isInitialized) {
    await dataSource.initialize()
      .then(async () => {
        await carregarDados()
          .then(() => {
            console.log('Everything went well');
          }).catch((e) => {
            throw e;
          });
      }).catch((e) => {
        console.log(e);
      });
  } else {
    await carregarDados();
  }
}
executar().then(() => {
  console.log('Script inicializado!');
}).catch((e) => {
  console.log(`ERRO!:\n${e}`);
});

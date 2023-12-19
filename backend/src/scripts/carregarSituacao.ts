import dataSource from "../database/config";
import path from "path";
import AprovadoRepo from "../database/ORM/repositorio/AprovadoRepo";
import LotadoEmRepo from "../database/ORM/repositorio/LotadoEmRepo";

import { TipoSituacao } from '../tipos/exporter'
import { SITUACAO_APROVADOS } from "../SSOT/scripts/script";


async function atualizarAprovado(
  st: TipoSituacao
){
  const aprovado = await AprovadoRepo.buscarPorPosicaoAmpla(st.posicao);
  if(aprovado !== null){
    aprovado.situacao = st.situacao;
    aprovado.turma= st.turma;
    await AprovadoRepo.save(aprovado);
  } else {
    console.log(st);
    console.log(`A posicao do candidato ${st.posicao} nao existe no bd`);
  }
}

async function atualizarLotacao(
  st: TipoSituacao
){
  if(st.diretoria && st.cidade){
  //seria um problema se houvessem mais cidades, mas o arquivo esta normalizado
  const estado = st.cidade === 'Brasilia' ? 'DF' : 'SP';
    await LotadoEmRepo.cadastrarLotadoEm(st.diretoria,st.posicao,st.cidade,estado);
  }
}

async function carregarDados(
  data: TipoSituacao[] = SITUACAO_APROVADOS
){
  for await(const st of data){
      await atualizarAprovado(st).catch((e) => { throw(e) });
      await atualizarLotacao(st).catch((e) => { throw(e) });
  }
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
executar().then(() => console.log("Script inicializado!")).catch((e) => console.log(`ERRO!:\n${e}`))



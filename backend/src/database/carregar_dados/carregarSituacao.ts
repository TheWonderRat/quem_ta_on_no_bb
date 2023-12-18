import dataSource from "../config";
import path from "path";
import AprovadoRepo from "../ORM/repositorio/AprovadoRepo";
import RankingRepo from "../ORM/repositorio/RankingRepo";
import LotadoEmRepo from "../ORM/repositorio/LotadoEmRepo";


const SITUACAO_APROVADOS = require(path.join(__dirname,'..','..','..','dados_dos_aprovados','situacaoAprovados.json'));
type TipoSituacao = {
  posicao: number,
  situacao: string,
  cidade?: string,
  diretoria?: string
  dataPosse?: Date,
  turma?: number
}

async function atualizarAprovado(
  st: TipoSituacao
){
  const aprovado = await AprovadoRepo.buscarPorPosicaoAmpla(st.posicao);
  if(aprovado !== null){
    aprovado.situacao = st.situacao;
    aprovado.turma= st.turma;
    //await AprovadoRepo.save(aprovado);
  } else {
    console.log(st);
    console.log(`A posicao do candidato ${st.posicao} nao existe no bd`);
  }
}

async function atualizarLotacao(
  st: TipoSituacao
){
  if(st.diretoria && st.cidade){
  //seria um problema se houvessem mais cidades
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



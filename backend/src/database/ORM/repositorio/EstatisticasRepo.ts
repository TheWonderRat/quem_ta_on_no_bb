import dataSource from '../../../database/config';
import { atributos, entidades, valoresPadrao } from '../../../SSOT/base_de_dados/exporter';
  //  entity
import { 
  Aprovado, 
  EstatisticasDiretoria, 
  EstatisticasLista, 
  EstatisticasPrazo, 
  EstatisticasSituacao
} from '../modelo/exporter'
import {
  RankingRepo,
  TurmaRepo,
  AprovadoRepo 
} from './exporter';
// substituir por uma conexao com o redis
// depois da implementacao do bot


  //  esses metodos sao temporarios
  //  no futuro o resultado as queries sera
  //  redirecionado para uma instancia do redis
class EstatisticasRepo {
  //  como nao existem dados sobre os momentos de qualificacao e convocacao
  //  serao mantidos apenas os dados relativos a local de posse
  public async buscarTotalDeEmpossados(): Promise<EstatisticasDiretoria>{
    const aprovados = await AprovadoRepo.buscarPorSitucoesExceto([
      valoresPadrao.Situacao.NaoConvocado,
    ]);

    // TODO:: refazer a query do servico de ranking para aceitar parametros em array
    const ampla = aprovados.filter((ap) => ( !ap.pcd && !ap.ppp ) || ( ap.ppp && ap.posicao <= 1500)).length;

    const ppp = aprovados.filter((ap) => ap.ppp && ap.posicao > 1500 && !ap.pcd ).length;

    const pcd = aprovados.filter((ap) => ap.pcd ).length;
    //nao e uma diretoria, mas a entidade diretoria serve bem a esse proposito
    return new EstatisticasDiretoria('todos', ppp, pcd, ampla)
  }

  public async buscarPorSituacoes(): Promise<EstatisticasSituacao>{
    //  enorme, porem vai rodar uma vez so
    //  TODO:: encontrar uma forma mais eficiente de mapear queries cruas

    const empossados = await AprovadoRepo
      .createQueryBuilder('apr')
      .where(`apr.${atributos.Aprovado.Situacao} =:st`,{ st: valoresPadrao.Situacao.Empossado})
      .getCount();

    const emPreparacao = await AprovadoRepo
      .createQueryBuilder('apr')
      .where(`apr.${atributos.Aprovado.Situacao} =:st`,{ st: valoresPadrao.Situacao.EmPreparacao})
      .getCount();

    const convocacaoAutorizada = await AprovadoRepo
      .createQueryBuilder('apr')
      .where(`apr.${atributos.Aprovado.Situacao} =:st`,{ st: valoresPadrao.Situacao.ConvocacaoAutorizada})
      .getCount();

    const convocacaoExpedida = await AprovadoRepo
      .createQueryBuilder('apr')
      .where(`apr.${atributos.Aprovado.Situacao} =:st`,{ st: valoresPadrao.Situacao.ConvocacaoExpedida})
      .getCount();

    const emQualificacao = await AprovadoRepo
      .createQueryBuilder('apr')
      .where(`apr.${atributos.Aprovado.Situacao} =:st`,{ st: valoresPadrao.Situacao.EmQualificacao})
      .getCount();

    const qualificado = await AprovadoRepo
      .createQueryBuilder('apr')
      .where(`apr.${atributos.Aprovado.Situacao} =:st`,{ st: valoresPadrao.Situacao.Qualificado})
      .getCount();

    const desistente = await AprovadoRepo
      .createQueryBuilder('apr')
      .where(`apr.${atributos.Aprovado.Situacao} =:st`,{ st: valoresPadrao.Situacao.Desistente})
      .getCount();

    const canceladoPorPrazo = await AprovadoRepo
      .createQueryBuilder('apr')
      .where(`apr.${atributos.Aprovado.Situacao} =:st`,{ st: valoresPadrao.Situacao.CanceladoPorPrazo})
      .getCount();

    const inapto = await AprovadoRepo
      .createQueryBuilder('apr')
      .where(`apr.${atributos.Aprovado.Situacao} =:st`,{ st: valoresPadrao.Situacao.Inapto})
      .getCount();


    const naoConvocado = await AprovadoRepo
      .createQueryBuilder('apr')
      .where(`apr.${atributos.Aprovado.Situacao} =:st`,{ st: valoresPadrao.Situacao.NaoConvocado})
      .getCount();

    return new EstatisticasSituacao(
      emPreparacao,
      convocacaoAutorizada,
      convocacaoExpedida,
      emQualificacao,
      qualificado,
      empossados,
      desistente,
      canceladoPorPrazo,
      inapto,
      naoConvocado
    );
    
  }

  public async buscarEstatisticasDiretoria( diretoria: valoresPadrao.Diretorias ): Promise<EstatisticasDiretoria>{
    const ppp = await RankingRepo.buscarPorRanking(
      valoresPadrao.TipoRanking.PPPCompleta,
      undefined,
      undefined,
      undefined,
      diretoria,
    ).then((rp) => rp.filter((ap) => {
      return ap.situacao !== valoresPadrao.Situacao.NaoConvocado
    }));

    const pcd = await RankingRepo.buscarPorRanking(
      valoresPadrao.TipoRanking.PCDCompleta,
      undefined,
      undefined,
      undefined,
      diretoria,
    ).then((rp) => {
      return rp.filter((ap) => ap.situacao !== valoresPadrao.Situacao.NaoConvocado)
    });

    const ampla = await RankingRepo.buscarPorRanking(
      valoresPadrao.TipoRanking.AmplaCompleta,
      undefined,
      undefined,
      undefined,
      diretoria,
    ).then((ok) => {
        // WARNING:: lembrar desse filtro qunado alteracoes forem feitas
      return ok.filter((ap) => ((!ap.pcd && !ap.ppp) || ( ap.ppp && ap.posicao <= 1500 ) && ap.situacao !== valoresPadrao.Situacao.NaoConvocado)
    )});

    return new EstatisticasDiretoria(diretoria,ppp.length,pcd.length, ampla.length);
  }
  //  esses metodos sao temporarios
  //  no futuro o resultado as queries sera
  //  redirecionado para uma instancia do redis

  public async buscarEstatisticasPorLista( lista: valoresPadrao.TipoRanking ): Promise<EstatisticasLista>{

    const ditec = await RankingRepo.buscarPorRanking(
      lista,
      undefined,
      undefined,
      undefined,
      valoresPadrao.Diretorias.DITEC,
    ).then((rp) => rp.filter((ap) => ap.situacao !== valoresPadrao.Situacao.NaoConvocado ));

    const uan = await RankingRepo.buscarPorRanking(
      lista,
      undefined,
      undefined,
      undefined,
      valoresPadrao.Diretorias.UAN,
    ).then((rp) => rp.filter((ap) => ap.situacao !== valoresPadrao.Situacao.NaoConvocado ));

    const ucf = await RankingRepo.buscarPorRanking(
      lista,
      undefined,
      undefined,
      undefined,
      valoresPadrao.Diretorias.UCF, 
    ).then((rp) => rp.filter((ap) => ap.situacao !== valoresPadrao.Situacao.NaoConvocado ));

    return new EstatisticasLista(lista,ditec.length, uan.length, ucf.length);
  }


  //  nao implementado ainda
  public async buscarTempoPosse(): Promise<Date>{
    const turmas = await TurmaRepo.buscarTodos();

    //  para cada uma das turmas, buscar todos os aprovados em ordem ascendente
    //  usando a join entre aprovado e LotadoEm
    //  pegar o primeiro como menor data, subtrair a diferenca de todos os outros e tirar a media
    //  somar com a menor data e retornar
    for( const turma of turmas ){

      
    }
    return new Date();
  }

  //  nao implementado ainda
  public async buscarTempoEntreTurmas(): Promise<Date>{
    return new Date()
  }
}
export default new EstatisticasRepo();

import {
  RankingRepo,
} from '../../../database/ORM/repositorio/exporter';
import {
  ServicoAbstrato,
} from '../../../compartilhados/servico/exporter';
import {
  RequisicaoParaListarORanking,
  RespostaParaListarORanking,
} from '../../../tipos/servicos/ranking';

import AppError from '../../../compartilhados/erros/AppError';

export default class ServicoParaListarORanking extends
  ServicoAbstrato< RequisicaoParaListarORanking, RespostaParaListarORanking > {

  public override async executar(parameters: RequisicaoParaListarORanking):

  Promise<RespostaParaListarORanking | AppError> {

    const aprovados = await RankingRepo.buscarPorRanking(
      parameters.tipoRanking,
      parameters.pagina,
      parameters.aprovados,
      parameters.situacao,
      parameters.diretoria,
      parameters.cidade,
      parameters.turma,
    );
    return { mensagem: 'called on list request', aprovados };
  }
}

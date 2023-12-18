import { RankingRepo } from "../../../database/ORM/repositorio/exporter";
import { ServicoAbstrato } from "../../../compartilhados/servico/exporter";
import { RequisicaoParaListarORanking, RespostaParaListarORanking} from '../../../tipos/servicos/ranking'


export class ServicoParaListarORanking extends ServicoAbstrato<
  RequisicaoParaListarORanking, RespostaParaListarORanking
>{

  public async executar(parameters: RequisicaoParaListarORanking): Promise<RespostaParaListarORanking>{

    const aprovados = await RankingRepo.buscarPorRanking(
      parameters.aprovados,
      parameters.pagina,
      parameters.tipoRanking,
      parameters.situacao,
      parameters.cidade,
      parameters.diretoria,
      parameters.turma,
    )

    return { mensagem: "called on list request", aprovados }    
  }
}

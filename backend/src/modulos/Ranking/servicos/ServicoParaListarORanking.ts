import ServicoAbstrato from "../../../compartilhados/servico/ServicoAbstrato";
import { RequisicaoParaListarORanking, RespostaParaListarORanking} from '../../../tipos/servicos/ranking'


export class ServicoParaListarORanking extends ServicoAbstrato<
  RequisicaoParaListarORanking, RespostaParaListarORanking
>{

  public async executar(parameters: RequisicaoParaListarORanking): Promise<RespostaParaListarORanking>{
    return { email: "called on list request"}    
  }
}

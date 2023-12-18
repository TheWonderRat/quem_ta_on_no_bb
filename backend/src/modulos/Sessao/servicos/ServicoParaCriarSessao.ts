import AbstractService from "../../../compartilhados/servico/ServicoAbstrato";
import { RequisicaoParaCriarSessao, RespostaParaCriarSessao} from "../../../tipos/servicos/sessao";
import { AprovadoRepo } from "../../../database/ORM/repositorio/exporter";
import { UsuarioNaoExiste, SenhaIncompativel,ContaEstaInativa } from "../../../compartilhados/erros/exporter";

export default class ServicoParaCriarSessao extends AbstractService<RequisicaoParaCriarSessao,RespostaParaCriarSessao>{

  public async executar(parameters: RequisicaoParaCriarSessao): Promise<RespostaParaCriarSessao>{

    const login= parameters.login;
    //checa se o usuario existe na base de dados
    const aprovado = await AprovadoRepo.buscarPorPosicaoAmpla(login);
    //checa se o usuario existe na base de dados
    //se nao existe, a aplicacao retorna um erro
    if(!aprovado){
      throw new UsuarioNaoExiste()
    }

    const senha = parameters.senha;

    //checa se a senha do aprovado confere 
    //se nao existe, a aplicacao retorna um erro
    if(aprovado.senha !== senha ){
      throw new SenhaIncompativel()
    }

    //checa se a conta do aprovado esta ativa
    if(aprovado.ativado){
      throw new ContaEstaInativa()
    }
    
    //TODO:: retorna um token ao usuario

    return { mensagem: "called on create session request", token: "token"} 
  }

}

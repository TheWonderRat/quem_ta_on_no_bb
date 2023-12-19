import AbstractService from '../../../compartilhados/servico/ServicoAbstrato';
import { RequisicaoParaCriarSessao, RespostaParaCriarSessao} from '../../../tipos/servicos/sessao';
import { AprovadoRepo } from '../../../database/ORM/repositorio/exporter';
import { UsuarioNaoExiste, SenhaIncompativel,ContaEstaInativa, AppError } from '../../../compartilhados/erros/exporter';
import { GerenciadorDeSenha, GerenciadorDeAutenticacao } from '../../../compartilhados/utilitarios/exporter';

export default class ServicoParaCriarSessao extends AbstractService<RequisicaoParaCriarSessao,RespostaParaCriarSessao>{

  public async executar(parameters: RequisicaoParaCriarSessao): Promise<RespostaParaCriarSessao | AppError>{

    const login = parameters.login;
    //  checa se o usuario existe na base de dados
    const aprovado = await AprovadoRepo.buscarPorPosicaoAmpla(login);
    //  checa se o usuario existe na base de dados
    //  se nao existe, a aplicacao retorna um erro
    if(!aprovado){
      return new UsuarioNaoExiste()
    }

    const senhaConfere = await GerenciadorDeSenha.compararSenha(aprovado.senha,parameters.senha )


    //  checa se a conta do aprovado esta ativa
    if(!aprovado.ativado){
      return new ContaEstaInativa()
    }

    //  checa se a senha do aprovado confere 
    //  se nao existe, a aplicacao retorna um erro
    if(!senhaConfere){
      return new SenhaIncompativel()
    }

    const token = GerenciadorDeAutenticacao.gerarToken(login.toString());
    
    //  TODO:: retorna um token ao usuario

    return { mensagem: 'Token gerado com sucesso!', token }
  }

}

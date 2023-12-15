import ServicoAbstrato from "../../../compartilhados/servico/ServicoAbstrato";
import {  RequisicaoParaAtualizarSenha, RespostaParaAtualizarSenha} from "../../../tipos/servicos/aprovado";
import { AprovadoRepo } from "../../../database/ORM/repositorio/exporter";
import { UsuarioNaoExiste, ContaEstaInativa, SenhaIncompativel } from "../../../compartilhados/erros/exporter";



export default class ServicoParaAtualizarSenha extends ServicoAbstrato<RequisicaoParaAtualizarSenha,RespostaParaAtualizarSenha>{

  public async executar(parameters: RequisicaoParaAtualizarSenha): Promise<RespostaParaAtualizarSenha>{

    const login = parameters.inscricao ;
    //checa se o usuario existe na base de dados
    const aprovado = await AprovadoRepo.buscarPorLogin(login);
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


    if(!aprovado.ativado){
      throw new ContaEstaInativa()
    }

    const novaSenha = parameters.novaSenha;
    //caso nenhum dos erros acima ocorra, ativa a conta
    //e reporta o sucesso para o usuario
    aprovado.senha = novaSenha ;

    await AprovadoRepo.save(aprovado);
      
    return { mensagem: "conta ativada com sucesso!" }
  }
}





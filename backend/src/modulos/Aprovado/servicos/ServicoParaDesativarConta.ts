import {  RequisicaoParaDesativarConta, RespostaParaDesativarConta} from "src/tipos/servicos/aprovado";
import { AprovadoRepo } from "../../../database/ORM/repositorio/exporter";
import { ServicoAbstrato } from "../../../compartilhados/servico/exporter";
import { UsuarioNaoExiste,SenhaIncompativel,ContaEstaInativa } from "../../../compartilhados/erros/exporter";



export default class ServicoParaDesativarConta extends ServicoAbstrato<RequisicaoParaDesativarConta, RespostaParaDesativarConta>{

  public async executar(parameters: RequisicaoParaDesativarConta): Promise<RespostaParaDesativarConta>{
    const login = parameters.login;
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

    //checa se a conta esta ativada, ou nao ha senha para atualizar
    //se nao existe, a aplicacao retorna um erro
    if( !aprovado.ativado ){
      throw new ContaEstaInativa()
    }
    //TODO:: apagar os dados de contato do aprovado

    await AprovadoRepo.save(aprovado);
    //Deveria apagar os dados do alem do contato na plataforma? 
    return { mensagem: "A conta foi desativada, seus dados foram apagados!" }
      
  }
}

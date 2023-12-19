import { AprovadoRepo } from '../../../database/ORM/repositorio/exporter';
import { ServicoAbstrato } from '../../../compartilhados/servico/exporter';
import {  RequisicaoParaAtivarConta, RespostaParaAtivarConta } from '../../../tipos/servicos/aprovado';
import { UsuarioNaoExiste, SenhaIncompativel, ContaEstaAtiva, AppError } from '../../../compartilhados/erros/exporter';
import { GerenciadorDeSenha } from '../../../compartilhados/utilitarios/exporter';



export default class ServicoParaAtivarConta extends ServicoAbstrato<RequisicaoParaAtivarConta, RespostaParaAtivarConta>{
  //  deveria pedir ou email ou senha na requisicao''
  public async executar(parameters: RequisicaoParaAtivarConta): Promise<RespostaParaAtivarConta | AppError>{

    const login = parameters.login;
    //  checa se o usuario existe na base de dados
    const aprovado = await AprovadoRepo.buscarPorPosicaoAmpla(login);
    //  checa se o usuario existe na base de dados
    //  se nao existe, a aplicacao retorna um erro
    if(!aprovado){
      return new UsuarioNaoExiste();
    }

    const senhaConfere = await GerenciadorDeSenha.compararSenha(aprovado.senha, parameters.senha);

    //  checa se a senha do aprovado confere 
    //  se nao existe, a aplicacao retorna um erro
    if(!senhaConfere){
      return new SenhaIncompativel()
    }


    if(aprovado.ativado){
      return new ContaEstaAtiva()
    }

    //  caso nenhum dos erros acima ocorra, ativa a conta
    //  e reporta o sucesso para o usuario
    aprovado.ativado = true;

    await AprovadoRepo.save(aprovado);
      
    return { mensagem: 'conta ativada com sucesso!' }
  }
}

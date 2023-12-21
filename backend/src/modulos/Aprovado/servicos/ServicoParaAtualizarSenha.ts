import ServicoAbstrato from '../../../compartilhados/servico/ServicoAbstrato';
import {  RequisicaoParaAtualizarSenha, RespostaParaAtualizarSenha} from '../../../tipos/servicos/aprovado';
import { AprovadoRepo } from '../../../database/ORM/repositorio/exporter';
import { UsuarioNaoExiste, ContaEstaInativa, SenhaIncompativel, AppError} from '../../../compartilhados/erros/exporter';
import { GerenciadorDeSenha } from '../../../compartilhados/utilitarios/exporter';



export default class ServicoParaAtualizarSenha extends ServicoAbstrato<RequisicaoParaAtualizarSenha,RespostaParaAtualizarSenha>{

  public override async executar(parameters: RequisicaoParaAtualizarSenha): Promise<RespostaParaAtualizarSenha | AppError>{

    const login = parameters.login;
    //  checa se o usuario existe na base de dados
    const aprovado = await AprovadoRepo.buscarPorPosicaoAmpla(login);
    //  checa se o usuario existe na base de dados
    //  se nao existe, a aplicacao retorna um erro
    if(!aprovado){
      return new UsuarioNaoExiste();
    }


    if(!aprovado.ativado){
      return new ContaEstaInativa();
    }

    //  checa se a senha do aprovado confere 
    //  se nao existe, a aplicacao retorna um erro
    const senhaConfere = await GerenciadorDeSenha.compararSenha(aprovado.senha, parameters.senha);

    if(!senhaConfere){
      return new SenhaIncompativel();
    }

    //  caso nenhum dos erros acima ocorra, ativa a conta
    //  e reporta o sucesso para o usuario
    aprovado.senha = await GerenciadorDeSenha.criptografarSenha(parameters.novaSenha);

    await AprovadoRepo.save(aprovado);
      
    return { mensagem: 'A senha foi trocada com sucesso!' }
  }
}





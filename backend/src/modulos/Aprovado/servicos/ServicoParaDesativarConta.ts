import {  RequisicaoParaDesativarConta, RespostaParaDesativarConta} from 'src/tipos/servicos/aprovado';
import { AprovadoRepo } from '../../../database/ORM/repositorio/exporter';
import { ServicoAbstrato } from '../../../compartilhados/servico/exporter';
import { UsuarioNaoExiste,SenhaIncompativel,ContaEstaInativa, AppError } from '../../../compartilhados/erros/exporter';
import { GerenciadorDeSenha} from '../../../compartilhados/utilitarios/exporter';



export default class ServicoParaDesativarConta extends ServicoAbstrato<RequisicaoParaDesativarConta, RespostaParaDesativarConta>{

  public async executar(parameters: RequisicaoParaDesativarConta): Promise<RespostaParaDesativarConta | AppError>{
    const login = parameters.login;
    //  checa se o usuario existe na base de dados
    const aprovado = await AprovadoRepo.buscarPorPosicaoAmpla(login);
    //  checa se o usuario existe na base de dados
    //  se nao existe, a aplicacao retorna um erro
    if( !aprovado ){
      return new UsuarioNaoExiste()
    }

    //  checa se a senha do aprovado confere 
    //  se nao existe, a aplicacao retorna um erro
    const senhaConfere = await GerenciadorDeSenha.compararSenha(aprovado.senha, parameters.senha)

    if(!senhaConfere){
      return new SenhaIncompativel()
    }

    //  checa se a conta esta ativada, ou nao ha senha para atualizar
    //  se nao existe, a aplicacao retorna um erro
    if( !aprovado.ativado ){
      return new ContaEstaInativa()
    }
    //  TODO:: apagar os dados de contato do aprovado

    aprovado.ativado = false;
    aprovado.senha = await GerenciadorDeSenha.criptografarSenha(aprovado.posicao.toString());
    await AprovadoRepo.save(aprovado);
    //  Deveria apagar os dados do alem do contato na plataforma? 
    return { mensagem: 'A conta foi desativada, seus dados foram apagados!' }
  }
}

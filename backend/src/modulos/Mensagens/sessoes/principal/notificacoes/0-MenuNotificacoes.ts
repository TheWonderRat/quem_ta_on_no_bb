import { SessaoDeMensagem, TipoRespostaMensagem } from "../../SessaoDeMensagem";
import MenuPrincipal from "../0-MenuPrincipal";
import { ParametrosDeMensagem } from '../../../../../compartilhados/utilitarios/GerenciadorDeMensagens';
//  import Notificacao from "../../../../../database/ORM/modelo/Notificacao";
import { valoresPadrao } from "../../../../../SSOT/base_de_dados/exporter";
import AprovadoRepo from "../../../../../database/ORM/repositorio/AprovadoRepo";

export default class MenuNotificacoes extends SessaoDeMensagem{
  //  se o usuario estiver na base de dados, retorna a classe de pergutna missao
  //  se o usuario nao for encontrado, retorna para a sessao anterior
  //  se os usuarios tiverem nomes repetidos, retorna a classe que pergunta pela inscricao
  //  se apenas um usuario for encontrado, parte para a pergunta da missao
  protected parametros: ParametrosDeMensagem;
  protected atualizandoNumeroWhats: boolean

  protected setAtualizandoNumeroWhats( value: boolean){
    this.atualizandoNumeroWhats = value
  }

  public override mensagemDeEntrada(): string[] {
    //  TODO:: buscar pelo usuario em questao para checar se as notificacoes estao ativas ou nao
    //  primeiro devemos checar se o usuario ja cadastrou o numero de celular
    const numeroRegistrado = this.parametros.aprovado.contatoDoAprovado.uuidWhatsapp

    //  se nao possui numero registrado, o bot avisa que o numero deve ser 
    //  armazenado para que as notificacoes funcionem
    
    if ( !numeroRegistrado ){
      this.setAtualizandoNumeroWhats(true)

      return [
        'Para receber as notificacoes voce deve autorizar o armazenamento do seu numero de celular',
        ' Permitir armazenamento?:\
          \n 0 -> Voltar ao menu inicial\
          \n1 -> Sim\
          \n2 -> Nao'
      ]
    }

    return [
      "As opcoes de notificacao sao:\
        \n0 -> Voltar ao menu inicial\
        \n1 -> Notificar situacao dos Aprovados: (${})\
        \n2 -> Notificar posses por diretoria: \
        \n3 -> Nao desejo receber notificacoes\
      ",
    ]
  }
  public async interpretarMensagem( mensagem: string ): Promise<TipoRespostaMensagem>{
    //  mais de uma pessoa com o mesmo nome
    let resposta: TipoRespostaMensagem | undefined = undefined;

    if ( this.atualizandoNumeroWhats ){
      return this.armazenarNumeroWhats( mensagem )
    } 

    return this.gerenciarNotificacoes( mensagem )
  }

  protected async armazenarNumeroWhats( mensagem: string ): Promise<TipoRespostaMensagem>{
    const opcao = Number( mensagem );

    let resposta: TipoRespostaMensagem | undefined = undefined;

    if( !isNaN(opcao) ){
      switch( opcao ){
        case 0:
          resposta = this.voltar()
          break;
        case 1:
          //  salva o numero do whats, prossegue para o gerencimento de notificacoes
          this.setAtualizandoNumeroWhats(false)
          const aprovado = this.parametros.aprovado
          aprovado.contatoDoAprovado.uuidWhatsapp = this.parametros.uuidWhatsapp
          await AprovadoRepo.save(aprovado);

          return this.gerenciarNotificacoes( mensagem )
          break;
        case 2:
          //  retorna para a sessao anterior, nao armazena a sessao
          resposta = this.voltar()
          break;
        default:
          this.setAtualizandoNumeroWhats(false)
          
      }
    }

    if( !resposta ){

      resposta = {
        novaSessao: this,
        respostas: [
          'Resposta invalida! tente novamente',
          ...this.mensagemDeEntrada()
        ]
      }
    }

    return resposta
  }

  protected async gerenciarNotificacoes( mensagem: string ): Promise<TipoRespostaMensagem>{
    const opcao = Number(mensagem);

    let resposta: TipoRespostaMensagem | undefined = undefined;

    if( !isNaN(opcao) ){
      switch( opcao ){
        case 0:
          resposta = this.voltar();
          break;
        case 1:
          resposta = await this.quandoAListaForAtualizada();
          break;
        case 2:
          resposta = await this.quandoASituacaoForAtualizada();
          break;
        case 3:
          resposta = await this.quandoASituacaoForAtualizada();
          break;
      }
    }

    if (!resposta ){
      resposta = { 
        novaSessao: this,
        respostas: [
          mensagem,
          ...this.mensagemDeEntrada()
        ]
      }      
    }

    return resposta
  }

  protected async quandoAListaForAtualizada(){
    //  verifica se as notificacoes estavam atualizadas
    const mensagem = `Sua opcao de notificacao com a lista foi atualizada!`;
    return { 
      novaSessao: this,
      respostas: [
        mensagem,
        ...this.mensagemDeEntrada()
      ]
    }
  }

  protected async quandoASituacaoForAtualizada(): Promise<TipoRespostaMensagem>{
    //  const estatisticas = await EstatisticasRepo.buscarTempoEntreTurmas();
    const mensagem = `Sua opcao de notificacao foi com a situacao foi atualizada!`;
    return { 
      novaSessao: this,
      respostas: [
        mensagem,
        `Esta e a respota sobre a colocacao do aprovado no concurso`,
        ...this.mensagemDeEntrada()
      ]
    }
  }

  protected sessaoNaoEncontrada(): string {
    return '';
  }

  protected voltar(): TipoRespostaMensagem{
    const menu = new MenuPrincipal( this.parametros );
    return { 
      novaSessao: menu,
      respostas: menu.mensagemDeEntrada()
    }
  }
}

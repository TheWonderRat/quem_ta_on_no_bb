import { SessaoDeMensagem, TipoRespostaMensagem } from "../../SessaoDeMensagem";
import MenuPrincipal from "../0-MenuPrincipal";
import { ParametrosDeMensagem } from '../../../../../compartilhados/utilitarios/GerenciadorDeMensagens';

export default class MenuNotificacoes extends SessaoDeMensagem{
  //  se o usuario estiver na base de dados, retorna a classe de pergutna missao
  //  se o usuario nao for encontrado, retorna para a sessao anterior
  //  se os usuarios tiverem nomes repetidos, retorna a classe que pergunta pela inscricao
  //  se apenas um usuario for encontrado, parte para a pergunta da missao
  protected parametros: ParametrosDeMensagem;

  public override mensagemDeEntrada(): string[] {
    //  TODO:: buscar pelo usuario em questao para checar se as notificacoes estao ativas ou nao
    /*
    return [
      "Digite o numero para fazer uma consulta:\
        \n0 -> Voltar ao menu inicial\
        \n1 -> Notificar toda vez que a lista for atualizada\
        \n2 -> Notificar toda vez que a sua situacao for atualizada\
      ",
    ]
    */
    return [
      "Voce gostaria que a aplicacao notificasse os usuarios? Escolha uma opcao!\
        \n0 -> Voltar ao menu inicial\
        \n1 -> Notificar toda vez que a lista for atualizada\
        \n2 -> Notificar toda vez que a sua situacao for atualizada\
        \n3 -> Nao desejo receber notificacoes\
      ",
    ]
  }
  public async interpretarMensagem( mensagem: string ): Promise<TipoRespostaMensagem>{


    
    /*


    this.salvarConversa(mensagem, resposta);

    return resposta;
    */

          
    //  mais de uma pessoa com o mesmo nome
    let resposta: TipoRespostaMensagem | undefined = undefined;

    const opcao = Number(mensagem);
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



    if( !resposta ){
      resposta = { 
        novaSessao: this,
        respostas: [
          `Opcao invalida!: ${ mensagem } nao e um numero do menu!`,
          'Selecione uma das opcoes abaixo:',
          ...this.mensagemDeEntrada()
        ]
      }
    } else { //TODO:: atualizar se as notificacoes forem implementadas!
      const menu = new MenuPrincipal( this.parametros );
      resposta = { 
        novaSessao: menu,
        respostas: [
          //'Desculpe, as notificacoes nao foram implementadas ainda!',
          'Obrigado pelo feedback!',
          'Voce sera encaminhado ao menu inicial!',
          ...menu.mensagemDeEntrada()
        ]
      }    
    }

    await this.salvarConversa(mensagem,resposta, this.parametros.aprovado.posicao);
    return resposta;
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

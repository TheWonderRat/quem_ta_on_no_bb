import MenuPrincipal from '../0-MenuPrincipal';
//
import { SessaoDeMensagem, TipoRespostaMensagem } from '../../SessaoDeMensagem';
import { ParametrosDeMensagem } from '../../../../../compartilhados/utilitarios/GerenciadorDeMensagens';
//  
export default class VerificarConta extends SessaoDeMensagem {
  //  se o usuario estiver na base de dados, retorna a classe de pergutna missao
  //  se o usuario nao for encontrado, retorna para a sessao anterior
  //  se os usuarios tiverem nomes repetidos, retorna a classe que pergunta pela inscricao
  //  se apenas um usuario for encontrado, parte para a pergunta da missao
  protected parametros: ParametrosDeMensagem;

  public mensagemDeEntrada(): string[] {
    return [
      'Essa opcao e para verificacao de conta!'
    ]
  }

  public async interpretarMensagem( mensagem: string ): Promise<TipoRespostaMensagem>{
          
    //armazenar a mensagem

    //  mais de uma pessoa com o mesmo nome
    const menu = new MenuPrincipal(this.parametros);
    return { 
      novaSessao: menu,
      respostas: [
        'Obrigado! Sua sugestao sera avaliada pelos desenvolvedores',
        ...menu.mensagemDeEntrada() 
      ]
    };
  }

  //  tambem nao vai acontecer, pois volta direto para a sessao anterior
  protected voltar(): TipoRespostaMensagem{
    return {
      novaSessao: this,
      respostas: this.mensagemDeEntrada()
    } 
  }
}

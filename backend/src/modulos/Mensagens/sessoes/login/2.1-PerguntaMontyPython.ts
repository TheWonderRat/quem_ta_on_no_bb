/*
import { SessaoDeMensagem, TipoRespostaMensagem } from '../SessaoDeMensagem';
import PerguntaNome from './1-PerguntaNome';
import MenuPrincipal from '../principal/0-MenuPrincipal';
import PerguntaMissao from './2-PerguntaSenha';
import { ParametrosDeSessao } from '../../../../compartilhados/utilitarios/GerenciadorDeMensagens';

export default class PerguntaMontyPython extends SessaoDeMensagem{
   public static perguntasPossiveis: string[] = [
    'Qual e a capital da Siria?',
    'Qual e a velocidade de voo media de uma andorinha em km/h?',
    'Qual e sua cor favorita?'
  ];

  protected numeroPergunta: number;
  
  constructor( parametros: ParametrosDeSessao ){
    super( parametros )
    this.numeroPergunta = Math.ceil(Math.random() * PerguntaMontyPython.perguntasPossiveis.length - 1) 
  }

  public override mensagemDeEntrada(): string[] {
      return [
      PerguntaMontyPython.perguntasPossiveis[this.numeroPergunta]
    ]
  }

  public async interpretarMensagem( mensagem: string ): Promise<TipoRespostaMensagem>{

    switch( this.numeroPergunta ){
      case 0:
        return this.perguntaCapitalSiria (mensagem);
      case 1:
        return this.perguntaVelocidadeAndorinha(mensagem);
      case 2:
        return this.perguntaCorFavorita(mensagem)
      default:
      //  nao deu a resposta correta
        return { 
            novaSessao: this,
            respostas: [
            'Essa opcao nao existe!',
            'Tente de novo!',
            ...this.mensagemDeEntrada()
          ]
        };
    }
  }

  protected perguntaCapitalSiria( mensagem: string ): TipoRespostaMensagem{
    //  retorna ok
    if ( mensagem.toLowerCase() === 'cairo'){
      const menuPrincipal = new MenuPrincipal( this.parametros );
      return {
        novaSessao: menuPrincipal,
        respostas: [
          'Aparentemente a Assiria nem existia no momento em 932a.C...',
          'Mas o Cairo era a "capital" do califado que dominava a regiao',
          'Enfim, parabens pela resposta!',
          ...menuPrincipal.mensagemDeEntrada()
        ]
      }
    } 
    const perguntaNome = new PerguntaNome( this.parametros );
    return {
        novaSessao: perguntaNome,
        respostas: [
          'Voce errou a pergunta, foi arremessado no  e perdeu sua vaga no bb.',
          'E brincadeira sobre a vaga, mas vai ter que comecar tudo de novo',
          ...perguntaNome.mensagemDeEntrada()
        ]
      }
  }

  protected perguntaCorFavorita( mensagem: string ): TipoRespostaMensagem{
    //  retorna ok
    const menu = new MenuPrincipal( this.parametros );
    return {
        novaSessao: menu,
        respostas: [
          'Parace que o eremita da cena 24 foi com a sua cara e nem vai checar se voce respondeu certo ou nao',
          'Mas parabens! Voce passou pela ponte da morte!',
          ...menu.mensagemDeEntrada()
        ]
      }
  }

  protected perguntaVelocidadeAndorinha( mensagem: string ): TipoRespostaMensagem{
    //  checar se a pessoa certou a velocidade media em km
    const msg = mensagem.toLowerCase();

    const velAndorinha = new RegExp('(.*)' + '[5-6][0-9]km/h' + '(.*)');
    if ( msg.match(velAndorinha)?.length ) {
      const menu = new MenuPrincipal( this.parametros );
      return {
        novaSessao: menu,
        respostas: [
          'Meu deus, voce acertou a velocidade media de uma andorinha!',
          'Parabens! Voce sera encaminhado ao menu principal!',
          ...menu.mensagemDeEntrada()
        ]
      };
    }
    //  checar se a pessoa fez a pergunta para o eremita
    const mataEremita = new RegExp('(.*)' + 'andorinha' + '(.*)' + 'africana' + '(.*)' + 'europeia' + '(.*)');
    if ( msg.match(mataEremita)?.length ) {
      const menu = new MenuPrincipal( this.parametros );
      return {
        novaSessao: new MenuPrincipal( this.parametros ),
        respostas: [
          'Como o eremita da cena 24 nao sabe a reposta, ele cai da ponte e voce pode passar',
          'Parabens! Voce sera encaminhado ao menu principal!',
          ...menu.mensagemDeEntrada()
        ]
      };
    }
    //  em todos os outros casos a pessoa MORRE
    const perguntaNome = new PerguntaNome( this.parametros );
    return {
        novaSessao: perguntaNome,
        respostas: [
          'Voce errou a pergunta, foi arremessado no  e perdeu sua vaga no bb.',
          'E brincadeira sobre a vaga, mas vai ter que comecar tudo de novo',
          ...perguntaNome.mensagemDeEntrada()
        ]
      }
  }

  protected voltar(): TipoRespostaMensagem{
    const missao = new PerguntaMissao( this.parametros );
    return {
      novaSessao: missao,
      respostas: missao.mensagemDeEntrada()
    }
  }
}
*/

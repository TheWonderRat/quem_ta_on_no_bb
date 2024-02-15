/*
import MenuPrincipal from "../principal/0-MenuPrincipal";
import { SessaoDeMensagem, TipoRespostaMensagem } from "../SessaoDeMensagem";
import PerguntaMissao from "./2-PerguntaSenha";
import { ParametrosDeSessao } from "../../../../compartilhados/utilitarios/GerenciadorDeMensagens";

export default class PerguntaAleatoriaLogin extends SessaoDeMensagem{
   public static perguntasPossiveis: string[] = [
    'Qual e o nome do Risadinha?',
    'Qual o nome do admin do grupo que da boas vindas recursivas?',
    'Qual o nome do admin que e fera com as planilhas?',
    'Como se chama o criador desse bot?',
    'Qual a linguagem de programacao predileta do labda(λ)/Boiko?',
    'Quem e o maior comedor de pao da DITEC?'
  ];

  protected numeroPergunta: number;
  
  constructor( parametros: ParametrosDeSessao ){
    super( parametros );
    this.numeroPergunta = Math.ceil(Math.random() * PerguntaAleatoriaLogin.perguntasPossiveis.length) - 1;
  }

  public override mensagemDeEntrada(): string[] {
      return [
      'Agora eu quero ver!',
      PerguntaAleatoriaLogin.perguntasPossiveis[this.numeroPergunta]
    ]
  }

  public async interpretarMensagem( mensagem: string ): Promise<TipoRespostaMensagem>{
    // consulta o repositorio de usuario pelo nome
    //
    // caso encontre mais de um usuario com o mesmo nome, pergunta pela posicao na ampla
    let resposta: boolean = true;

    switch( this.numeroPergunta ){
      case 0:
        resposta = this.perguntaNomeRisadinha(mensagem); break;
      case 1:
        resposta = this.perguntaBoasVindas(mensagem); break;
      case 2:
        resposta = this.perguntaPlanilha(mensagem); break;
      case 3:
        resposta = this.perguntaCriadorBot(mensagem); break;
      case 4:
        resposta = this.perguntaBoiko (mensagem); break;
      case 5:
        resposta = this.perguntaPaoPedrinho(mensagem); break;
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

    if( resposta ){
      const menu = new MenuPrincipal( this.parametros );
      return {
        novaSessao: menu,
        respostas: [
          'Essas sao as opcoes disponiveis!',
          ...menu.mensagemDeEntrada()
        ] 
      }
    }

    return { 
      novaSessao: this,
      respostas: [
        'Infelizmente sua respota esta errada! Tente novamente',
        ...this.mensagemDeEntrada()
      ]
    };
  }

  protected perguntaNomeRisadinha( mensagem: string ): boolean{
    //  retorna ok
    return mensagem.toLowerCase() === 'erick';
  }

  protected perguntaBoasVindas( mensagem: string ): boolean{
    return mensagem.toLowerCase() === 'adan';
  }

  protected perguntaPlanilha( mensagem: string ): boolean{
    const msg = mensagem.toLowerCase();
    return msg === 'misael' || msg === 'adan';
  }

  protected perguntaCriadorBot( mensagem: string ): boolean{
    const msg = mensagem.toLowerCase();
    return msg === 'l' || msg === 'felipe';
  }

  protected perguntaBoiko( mensagem: string ): boolean{
    return mensagem.toLowerCase() === 'lisp';
  }

  protected perguntaPaoPedrinho( mensagem: string ): boolean{
    return mensagem.toLowerCase() === 'pedrinho';
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

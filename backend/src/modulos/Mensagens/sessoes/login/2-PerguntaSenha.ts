import { SessaoDeMensagem, TipoRespostaMensagem } from '../SessaoDeMensagem';
import PerguntaNome from './1-PerguntaNome';
import MenuPrincipal from '../principal/0-MenuPrincipal';
import CriptografiaBcrypt from '../../../../compartilhados/dependencias/CriptografiaBcrypt';
import { ParametrosDeLogin, ParametrosDeMensagem } from '../../../../compartilhados/utilitarios/GerenciadorDeMensagens';
import Aprovado from '../../../../database/ORM/modelo/Aprovado';

export default class PerguntaSenha extends SessaoDeMensagem{
  protected aprovado: Aprovado;
  protected parametros: ParametrosDeLogin;

  constructor(parametros: ParametrosDeLogin, aprovado: Aprovado){
    super(parametros);
    this.aprovado = aprovado;
  }

  public override mensagemDeEntrada(): string[] {
    return [
      'Qual e a senha?\
      \n0 -> Volta para a pergunta de nome\
      '
    ]
  }

  public async interpretarMensagem( mensagem: string ): Promise<TipoRespostaMensagem> {
    //  volta para a pergunta do nome
    if( mensagem === '0' ){
      const pergunta = new PerguntaNome( this.parametros );
      return {
        novaSessao: pergunta,
        respostas: pergunta.mensagemDeEntrada()
      }
    }
    //  o bot nunca chegara ate esse ponto sem um aprovado
    const matched  = await CriptografiaBcrypt.compararSenha( this.aprovado.senha, mensagem );

    if ( matched ){
      const parametros = new ParametrosDeMensagem(
        this.parametros.uuidWhatsapp,
        this.parametros.criadaEm,
        this.aprovado
      );

      const novaPergunta = new MenuPrincipal(parametros)
      return { 
        
        novaSessao: novaPergunta,
        respostas: [
          `Lembre-se! Estamos armazenando todas as interacoes com o bot!`,
          ...novaPergunta.mensagemDeEntrada()
        ]
      };
    }

    return { 
      novaSessao: this, 
      respostas: [
        'Infelizmente a resposta nao esta correta...Procure ajuda no grupo do whatsapp!',
        ...this.mensagemDeEntrada()
      ]
    };
  }

  protected sessaoNaoEncontrada(): string {
    return '';
  }

  protected voltar(): TipoRespostaMensagem{
    const nome = new PerguntaNome( this.parametros );

    return {
      novaSessao: nome,
      respostas: nome.mensagemDeEntrada()
    } 
  }
}

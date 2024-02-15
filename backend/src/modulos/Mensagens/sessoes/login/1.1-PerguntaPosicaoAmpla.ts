import AprovadoRepo from '../../../../database/ORM/repositorio/AprovadoRepo';
import { SessaoDeMensagem, TipoRespostaMensagem } from '../SessaoDeMensagem';
import PerguntaNome from './1-PerguntaNome';
import { ParametrosDeLogin } from '../../../../compartilhados/utilitarios/GerenciadorDeMensagens';
import PerguntaSenha from './2-PerguntaSenha';

export default class PerguntaPosicaoAmpla extends SessaoDeMensagem{

  protected parametros: ParametrosDeLogin;
  protected nomeAprovado: string;

  constructor(parametros: ParametrosDeLogin, nomeAprovado: string){
    super( parametros );
    this.nomeAprovado = nomeAprovado;
  }

  public override mensagemDeEntrada(): string[] {
      return [
        'Encontramos mais de uma pessoa com mesmo nome para o concurso',
        'Qual e a sua posicao na ampla concorrencia?'
      ]
  }
  //  se o usuario estiver na base de dados, retorna a classe de pergutna missao
  //  se o usuario nao for encontrado, retorna para a sessao anterior
  //  se os usuarios tiverem nomes repetidos, retorna a classe que pergunta pela inscricao
  //  se apenas um usuario for encontrado, parte para a pergunta da missao
  public async interpretarMensagem( mensagem: string ): Promise<TipoRespostaMensagem>{

    const aprovado = await AprovadoRepo.buscarPorPosicaoAmpla(Number(mensagem))

    if ( aprovado && aprovado.nome === this.nomeAprovado ) {
      //  login foi bem sucedido
      const missao = new PerguntaSenha( this.parametros, aprovado );
      return { 
        novaSessao: missao,
        respostas: missao.mensagemDeEntrada()
      };
    }

    //  nenhuma pessoa foi encontrada
    return { 
      novaSessao: new PerguntaNome( this.parametros ),
      respostas: [
        'Infelizmente nao encontramos nenhuma pessoa com esse nome nessa posicao!',
        'Volte para a sessao anterior para tentar novamente!'
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

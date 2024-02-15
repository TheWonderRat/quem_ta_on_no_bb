import AprovadoRepo from '../../../../database/ORM/repositorio/AprovadoRepo';
import { SessaoDeMensagem, TipoRespostaMensagem } from '../SessaoDeMensagem';
import { ParametrosDeLogin } from '../../../../compartilhados/utilitarios/GerenciadorDeMensagens';
import PerguntaSenha from './2-PerguntaSenha';
import PerguntaPosicaoAmpla from './1.1-PerguntaPosicaoAmpla';

export default class PerguntaNome extends SessaoDeMensagem {
  //  se o usuario estiver na base de dados, retorna a classe de pergutna missao
  //  se o usuario nao for encontrado, retorna para a sessao anterior
  //  se os usuarios tiverem nomes repetidos, retorna a classe que pergunta pela inscricao
  //  se apenas um usuario for encontrado, parte para a pergunta da missao
  protected parametros : ParametrosDeLogin;

  public mensagemDeEntrada(): string[] {
    return [
      "Seja muito bem vindo/bem vinda!",
      "Essa e uma aplicacao nao oficial dos aprovados do concurso de 2023 do Banco do Brasil",
      "Responda as seguinta perguntar para acessar nossos servicos!",
      "Qual o seu nome?"
    ]
  }

  public async interpretarMensagem( mensagem: string ): Promise<TipoRespostaMensagem>{
    const aprovados = await AprovadoRepo.buscarPorNome(mensagem.normalize('NFD').replace(/[\u0300-\u036f]/g, "").toLowerCase());
    //  apenas uma pessoa com aquele nome, tudo ok
    if( aprovados.length === 1 ){
      const missao = new PerguntaSenha( this.parametros, aprovados[0]);
      return {
        novaSessao: missao,
        respostas: missao.mensagemDeEntrada() 
      }      
    //  nenhuma pessoa encontrada com o nome informado
    } else if ( aprovados.length === 0 ){
      return {
        novaSessao: this,
        respostas: [
          'Nenhuma pessoa com esse nome foi encontrada para o concurso atual...',
          'Tem certeza que digitou o nome certo?',
          'Vamos tentar novamente:',
          'Qual o seu nome?'
        ] 
      }      
    };
          
    //  mais de uma pessoa com o mesmo nome
    const perguntaPosicaoAmpla = new PerguntaPosicaoAmpla( this.parametros, mensagem );
    return { 
      novaSessao: perguntaPosicaoAmpla,
      respostas: perguntaPosicaoAmpla.mensagemDeEntrada() 
    };
  }

  protected voltar(): TipoRespostaMensagem{
    return {
      novaSessao: this,
      respostas: this.mensagemDeEntrada()
    } 
  }
}

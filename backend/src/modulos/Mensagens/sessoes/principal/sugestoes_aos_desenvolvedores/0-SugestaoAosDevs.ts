//  permite que o usuario de alguma sugestao aos desenvolvedores
//  tem a opcao de voltar para a sessao principal
import MenuPrincipal from '../0-MenuPrincipal';
//
import { SessaoDeMensagem, TipoRespostaMensagem } from '../../SessaoDeMensagem';
import SugestaoRepo from '../../../../../database/ORM/repositorio/SugestaoRepo';
import { ParametrosDeMensagem } from '../../../../../compartilhados/utilitarios/GerenciadorDeMensagens';

export default class SugestoesAosDevs extends SessaoDeMensagem {
  //  se o usuario estiver na base de dados, retorna a classe de pergutna missao
  //  se o usuario nao for encontrado, retorna para a sessao anterior
  //  se os usuarios tiverem nomes repetidos, retorna a classe que pergunta pela inscricao
  //  se apenas um usuario for encontrado, parte para a pergunta da missao

  protected parametros: ParametrosDeMensagem;

  public mensagemDeEntrada(): string[] {
    return [
      "Estamos curiosos! O que voce tem a dizer? Pode enviar 0 para cancelar a sugestao!"
    ]
  }

  public async interpretarMensagem( mensagem: string ): Promise<TipoRespostaMensagem>{

    console.log(Number(mensagem));
    if( Number(mensagem) === 0){
      const menu = new MenuPrincipal(this.parametros);
      return { 
        novaSessao: menu,
        respostas: [
          ...menu.mensagemDeEntrada() 
        ]
      };
    }

    await SugestaoRepo.cadastrarSugestao(
      this.parametros.uuidWhatsapp,
      this.parametros.aprovado?.posicao,
      mensagem
    );
    //armazenar a mensagem
    //  mais de uma pessoa com o mesmo nome
    const menu = new MenuPrincipal(this.parametros);
    const resposta = { 
      novaSessao: menu,
      respostas: [
        'Obrigado! Sua sugestao sera avaliada pelos desenvolvedores',
        ...menu.mensagemDeEntrada() 
      ]
    };

    await this.salvarConversa(mensagem,resposta); 
    return resposta;
  }

  //  tambem nao vai acontecer, pois volta direto para a sessao anterior
  protected voltar(): TipoRespostaMensagem{
    return {
      novaSessao: this,
      respostas: this.mensagemDeEntrada()
    } 
  }
}

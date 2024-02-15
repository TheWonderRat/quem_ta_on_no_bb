import { ParametrosDeMensagem } from "../../../../compartilhados/utilitarios/GerenciadorDeMensagens";
import { SessaoDeMensagem, TipoRespostaMensagem } from "../SessaoDeMensagem";
import MenuDocumentos from "./documentos/0-MenuDocumentos";
import MenuEstatisticasGerais from "./estatisticas_gerais/0-MenuEstatisticasGerais";
import MenuMinhasEstatisticasEDados from "./minhas_estatisticas_e_dados/0-MinhasEstatisticasEDados";
import MenuNotificacoes from "./notificacoes/0-MenuNotificacoes";
import SugestoesAosDevs from "./sugestoes_aos_desenvolvedores/0-SugestaoAosDevs";

export default class MenuPrincipal extends SessaoDeMensagem{
  //  se o usuario estiver na base de dados, retorna a classe de pergutna missao
  //  se o usuario nao for encontrado, retorna para a sessao anterior
  //  se os usuarios tiverem nomes repetidos, retorna a classe que pergunta pela inscricao
  //  se apenas um usuario for encontrado, parte para a pergunta da missao
  protected parametros: ParametrosDeMensagem;

  constructor( parametros: ParametrosDeMensagem ){
    super(parametros);
  }

  public override mensagemDeEntrada(): string[] {
    return [
      'Este e o menu principal da aplicacao!',
      "Digite o numero para ter acesso aa sessao:\
        \n1 -> Ajuda com a Documentacao\
        \n2 -> Estatisticas/Dados\
        \n3 -> Minhas Estatisticas\
        \n4 -> Notificacoes\
        \n5 -> Enviar sugestao aos desenvolvedores\
        \n6 -> Termos de uso\
      "
      //\n6 -> Verificar a conta\
      //\n7 -> Ajuda\
    ]
  }
  public async interpretarMensagem( mensagem: string ): Promise<TipoRespostaMensagem>{
          
    //  mais de uma pessoa com o mesmo nome
    let resposta: TipoRespostaMensagem | undefined;
    const number = Number(mensagem);
    if( !isNaN( number )){
      switch( number ) {
        case 1:
          resposta = await this.ajudaDocumentacao(this.parametros); 
          break;
        case 2:
          resposta = await this.estatisticasGerais(this.parametros); 
          break;
        case 3:
          resposta = await this.minhasEstatisticasEDados(this.parametros); 
          break;
        case 4:
          resposta = await this.gerenciarNotificacoes(this.parametros);
          break;
        case 5:
          resposta = await this.enviarSugestaoAosDevs(this.parametros);
          break;
        case 6:
          resposta = await this.verTermosDeUso(this.parametros);
          break;
          /*
        case 6:
          resposta = await this.verificarConta(this.parametros);
        case 7:
          resposta = await this.verAjuda(this.parametros);
          */
      }
    }

    if( !resposta ){
      resposta = { 
        novaSessao: this,
        respostas: [
          'Opcao invalida!',
          'Digite o numero da opcao desejada!',
          ...this.mensagemDeEntrada()
        ]
      }
    }

    await this.salvarConversa(mensagem, resposta);
    return resposta ;
  }

  protected async ajudaDocumentacao( parametros: ParametrosDeMensagem ): Promise<TipoRespostaMensagem>{
    const documentos = new MenuDocumentos(parametros);
    return {
      novaSessao: documentos,
      respostas: documentos.mensagemDeEntrada()
    }
  }

  protected async estatisticasGerais( parametros: ParametrosDeMensagem ): Promise<TipoRespostaMensagem>{
    const estatisticas = new MenuEstatisticasGerais(parametros);
    return {
      novaSessao: estatisticas,
      respostas: estatisticas.mensagemDeEntrada()
    }
  }

  protected async minhasEstatisticasEDados( parametros: ParametrosDeMensagem ): Promise<TipoRespostaMensagem>{
    const estatisticas = new MenuMinhasEstatisticasEDados(parametros);
    return {
      novaSessao: estatisticas,
      respostas: estatisticas.mensagemDeEntrada()
    }
  }

  protected async gerenciarNotificacoes( parametros: ParametrosDeMensagem): Promise<TipoRespostaMensagem>{
    const notificacoes = new MenuNotificacoes(parametros);
    return {
      novaSessao: notificacoes,
      respostas: notificacoes.mensagemDeEntrada()
    }
  } 

  protected async verTermosDeUso( parametros: ParametrosDeMensagem ): Promise<TipoRespostaMensagem>{
    return {
      novaSessao: this,
      respostas:[
        'Os termos de uso ainda nao foram implementados, mas aparecerao aqui quando forem!',
        'Voltando ao menu inicial',
        ...this.mensagemDeEntrada()
      ] 
    }
  }

  protected async enviarSugestaoAosDevs( parametros: ParametrosDeMensagem ): Promise<TipoRespostaMensagem>{
    const sugestao = new SugestoesAosDevs(parametros);
    return {
      novaSessao: sugestao,
      respostas: sugestao.mensagemDeEntrada()
    }
  }

  protected async verificarConta( parametros: ParametrosDeMensagem ): Promise<TipoRespostaMensagem>{
    const estatisticas = new MenuEstatisticasGerais(parametros);
    return {
      novaSessao: estatisticas,
      respostas: estatisticas.mensagemDeEntrada()
    }
  }

  protected async verAjuda( parametros: ParametrosDeMensagem ): Promise<TipoRespostaMensagem>{
    const estatisticas = new MenuEstatisticasGerais(parametros);
    return {
      novaSessao: estatisticas,
      respostas: estatisticas.mensagemDeEntrada()
    }
  }


  protected sessaoNaoEncontrada(): string {
     
    return '';
  }

  //  nao faz sentido para essa classe
  //  esta aqui pra conformar com o protocolo
  protected voltar(): TipoRespostaMensagem{
    return { 
      novaSessao: this,
      respostas: this.mensagemDeEntrada()
    };
  }
}

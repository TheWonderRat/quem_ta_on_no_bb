import { SessaoDeMensagem, TipoRespostaMensagem } from "../../SessaoDeMensagem";
import MenuPrincipal from "../0-MenuPrincipal";
import { ParametrosDeMensagem } from '../../../../../compartilhados/utilitarios/GerenciadorDeMensagens';
import { documentacao } from "../../../../../SSOT/exporter";
import CertidaoNegativaEstadual from "./1-CertidaoNegativaEstadual";
import FolhaDeAntecedentesEstadual from "./1-FolhaNegativaEstadual";

export default class MenuDocumentos extends SessaoDeMensagem{
  //  se o usuario estiver na base de dados, retorna a classe de pergutna missao
  //  se o usuario nao for encontrado, retorna para a sessao anterior
  //  se os usuarios tiverem nomes repetidos, retorna a classe que pergunta pela inscricao
  //  se apenas um usuario for encontrado, parte para a pergunta da missao
  protected parametros: ParametrosDeMensagem;

  public override mensagemDeEntrada(): string[] {
    //  TODO:: buscar pelo usuario em questao para checar se as notificacoes estao ativas ou nao
    return [
      "Quais links voce esta buscando?\
        \n0 -> Voltar ao menu inicial\
        \n1 -> Certidao Negativa de Antecetendes Criminais - Federal\
        \n2 -> Certidao Negativa de Antecetendes Criminais - Estadual\
        \n3 -> Folha de Antecedentes da Policia - Federal\
        \n4 -> Folha de Antecedentes da Policia - Estadual\
      ",
    ]
  }
  public async interpretarMensagem( mensagem: string ): Promise<TipoRespostaMensagem>{
    //  mais de uma pessoa com o mesmo nome
    let resposta: TipoRespostaMensagem | undefined = undefined;

    const opcao = Number(mensagem);
    if( !isNaN(opcao) ){
      switch( opcao ){
        case 0:
          resposta = this.voltar();
          break;
        case 1:
          resposta = await this.certidaoDeAntecedentesFederal();
          break;
        case 2:
          resposta = await this.certidaoDeAntecedentesEstadual();
          break;
        case 3:
          resposta = await this.folhaDeAntecedentesFederal();
          break;
        case 4:
          resposta = await this.folhaDeAntecedentesEstadual();
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
    } 

    await this.salvarConversa(mensagem,resposta, this.parametros.aprovado.posicao);
    return resposta;
  }

  protected async certidaoDeAntecedentesFederal(){
    //  verifica se as notificacoes estavam atualizadas
    const mensagem = `A Certidao Negativa Federal pode ser obtida no link abaixo!\n\n${documentacao.CertidaoNegativaFederal}`;
    return { 
      novaSessao: this,
      respostas: [
        mensagem,
        ...this.mensagemDeEntrada()
      ]
    }
  }
  protected async certidaoDeAntecedentesEstadual(){
    //  verifica se as notificacoes estavam atualizadas
    //const mensagem = `Sua opcao de notificacao com a lista foi atualizada!`;
    const certidao = new CertidaoNegativaEstadual( this.parametros );
    return { 
      novaSessao: certidao,
      respostas: [
        ...certidao.mensagemDeEntrada()
      ]
    }
  }

  protected async folhaDeAntecedentesFederal(): Promise<TipoRespostaMensagem>{
    //  const estatisticas = await EstatisticasRepo.buscarTempoEntreTurmas();
    const mensagem = `A Folha Negativa Federal pode ser obtida no link abaixo!\n\n${documentacao.FolhaAntecedentesFederal}`;
    return { 
      novaSessao: this,
      respostas: [
        mensagem,
        ...this.mensagemDeEntrada()
      ]
    }
  }

  protected async folhaDeAntecedentesEstadual(): Promise<TipoRespostaMensagem>{
    //  const estatisticas = await EstatisticasRepo.buscarTempoEntreTurmas();
    const mensagem = `Infelizmente essa opcao ainda nao foi implementada!, Ainda estamos obtendo os links das certidoes`;
    const folha = new FolhaDeAntecedentesEstadual( this.parametros );
    return { 
      novaSessao: this,
      respostas: [ mensagem ]
      /*
      novaSessao: folha,
      respostas: [
      ...folha.mensagemDeEntrada()
      ]
      */
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

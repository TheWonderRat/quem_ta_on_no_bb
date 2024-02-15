import EstatisticasRepo from "../../../../../database/ORM/repositorio/EstatisticasRepo";
import { valoresPadrao } from "../../../../../SSOT/base_de_dados/exporter";
import { SessaoDeMensagem, TipoRespostaMensagem } from "../../SessaoDeMensagem";
import { ParametrosDeMensagem } from '../../../../../compartilhados/utilitarios/GerenciadorDeMensagens';
import MenuPrincipal from "../0-MenuPrincipal";

export default class MenuEstatisticasGerais extends SessaoDeMensagem{
  //  se o usuario estiver na base de dados, retorna a classe de pergutna missao
  //  se o usuario nao for encontrado, retorna para a sessao anterior
  //  se os usuarios tiverem nomes repetidos, retorna a classe que pergunta pela inscricao
  //  se apenas um usuario for encontrado, parte para a pergunta da missao
  protected parametros: ParametrosDeMensagem;

  //TODO:: implementar buscar por situacao
  public override mensagemDeEntrada(): string[] {
    return [
      "Digite o numero para fazer uma consulta:\
        \n0 -> Voltar ao menu inicial\
        \n1 -> Numero total de convocados\
        \n2 -> Numero de empossados na DITEC\
        \n3 -> Numero de empossados na UAN\
        \n4 -> Numero de empossados na UCF\
        \n5 -> Numero de empossados PPP\
        \n6 -> Numero de empossados PCD\
        \n7 -> Numero de empossados pela ampla concorrencia\
        \n8 -> Buscar por situacao\
      ",
    ]
  }
  public async interpretarMensagem( mensagem: string ): Promise<TipoRespostaMensagem>{
          
    //  mais de uma pessoa com o mesmo nome
    const opcao = Number(mensagem);
    let resposta: TipoRespostaMensagem | undefined = undefined;

    if( !isNaN(opcao) ){
      switch( opcao ){
        case 0:
          return this.voltar();
        /*
        TODO:: implementar quando obter as datas dos questionarios
        case 1:
          return this.calcularMediaTempoQuesitonarioEPosse()
        case 2:
          return this.calcularMediaTempoEntreTurmas()
        */
        case 1:
          resposta = await this.obterTotaDeEmpossados(); 
          break;
        case 2:
          resposta = await this.obterPorDiretoria( valoresPadrao.Diretorias.DITEC ); 
          break;
        case 3:
          resposta = await this.obterPorDiretoria( valoresPadrao.Diretorias.UAN ); 
          break;
        case 4:
          resposta = await this.obterPorDiretoria( valoresPadrao.Diretorias.UCF ); 
          break;
        case 5:
          resposta = await this.obterPorLista( valoresPadrao.TipoRanking.PPPCompleta,'ppp' ); 
          break;
        case 6:
          resposta = await this.obterPorLista( valoresPadrao.TipoRanking.PCDCompleta,'pcd' ); 
          break;
        case 7:
          resposta = await this.obterPorLista( valoresPadrao.TipoRanking.AmplaCompleta,'ampla concorrencia' ); 
          break;
        case 8:
          resposta = await this.obterPorSituacao( valoresPadrao.TipoRanking.AmplaCompleta,'ampla concorrencia' ); 
          break;
      }
    }

    if( ! resposta ){
      resposta =  { 
        novaSessao: this,
        respostas: [
          `Opcao invalida!: ${ mensagem } nao e um numero do menu!`,
          'Selecione uma das opcoes abaixo:',
          ...this.mensagemDeEntrada()
        ]
      }
    }

    this.salvarConversa(mensagem, resposta);

    return resposta;
  }

  protected async obterTotaDeEmpossados(): Promise<TipoRespostaMensagem>{
    const  estatisticas = await EstatisticasRepo.buscarTotalDeEmpossados();

    return { 
      novaSessao: this,
      respostas: [
        `Sao ${ estatisticas.todos } convocados ao todo`,
        `Sendo ${ estatisticas.ampla } pela ampla concorrencia, ${ estatisticas.ppp } ppp e ${ estatisticas.pcd } pcd`,
        ...this.mensagemDeEntrada()
      ]
    }
  }

  protected async obterPorDiretoria( diretoria: valoresPadrao.Diretorias ): Promise<TipoRespostaMensagem>{
    const estatisticas = await EstatisticasRepo.buscarEstatisticasDiretoria( diretoria );

    return { 
      novaSessao: this,
      respostas: [
        `Sao ${ estatisticas.todos } empossados na ${ diretoria }`,
        `Sendo ${ estatisticas.ampla } pela ampla concorrencia, ${ estatisticas.ppp } ppp e ${ estatisticas.pcd } pcd`,
        ...this.mensagemDeEntrada()
      ]
    }
  }

  protected async obterPorLista( ranking: valoresPadrao.TipoRanking, nomeLista: string ): Promise<TipoRespostaMensagem>{
    const estatisticas = await EstatisticasRepo.buscarEstatisticasPorLista( ranking );

    return { 
      novaSessao: this,
      respostas: [
        `Sao ${ estatisticas.todos } empossados pela lista ${ nomeLista }`,
        `Sendo ${ estatisticas.DITEC } na DITEC, ${ estatisticas.UAN } na UAN e ${ estatisticas.UCF } na UCF`,
        ...this.mensagemDeEntrada()
      ]
    }
  }

  protected async obterPorSituacao( ranking: valoresPadrao.TipoRanking, nomeLista: string ): Promise<TipoRespostaMensagem>{
    const e = await EstatisticasRepo.buscarPorSituacoes()

    return { 
      novaSessao: this,
      respostas: [
        `nao convocado: ${e.naoConvocado}\nempossados: ${e.empossado}\nconvocacao autorizada: ${e.convocacaoAutorizada}\nconvocacao expedida: ${e.convocacaoExpedida}\nem qualificacao: ${e.emQualificacao}\nqualificado: ${e.qualificado}\ndesistente: ${e.desistente}\ncancelado por prazo: ${e.canceladoPorPrazo}\ninapto/outro motivos : ${e.inapto}`,
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

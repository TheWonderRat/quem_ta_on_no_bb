import { Aprovado, Ranking }  from "../../../../../database/ORM/modelo/exporter";
import RankingRepo from "../../../../../database/ORM/repositorio/RankingRepo";
import { SessaoDeMensagem, TipoRespostaMensagem } from "../../SessaoDeMensagem";
import MenuPrincipal from "../0-MenuPrincipal";
import { valoresPadrao } from "../../../../../SSOT/base_de_dados/exporter";
import { ParametrosDeMensagem } from "../../../../../compartilhados/utilitarios/GerenciadorDeMensagens";
import AtualizarSenha from "./1-AtualizarSenha";

export default class MenuMinhasEstatisticasEDados extends SessaoDeMensagem{
  //  se o usuario estiver na base de dados, retorna a classe de pergutna missao
  //  se o usuario nao for encontrado, retorna para a sessao anterior
  //  se os usuarios tiverem nomes repetidos, retorna a classe que pergunta pela inscricao
  //  se apenas um usuario for encontrado, parte para a pergunta da missao
  protected parametros: ParametrosDeMensagem;

  public override mensagemDeEntrada(): string[] {
    return [
      "Digite o numero para fazer uma consulta:\
        \n0 -> Voltar ao menu inicial\
        \n1 -> Minha colocacao no concurso\
        \n2 -> Quantas pessoas faltam para eu ser chamado(a)?\
        \n3 -> Quais dados meus essa aplicacao armazenou?\
        \n4 -> Atualizar senha\
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
          resposta = this.voltar(); 
          break;
        case 1:
          resposta = await this.minhaColocacaoNoConcurso( this.parametros.aprovado ); 
          break;
        case 2:
          resposta = await this.quantoFaltaPraEuSerChamado( this.parametros.aprovado ) ; 
          break;
        case 3:
          resposta = await this.quaisDadosAAplicacaoArmazena(); 
          break;
        case 4:
          resposta = await this.trocarSenha( this.parametros ); 
          break;
          /*
        case 4:
          resposta = await this.atualizarSenha(mensagem, this.parametros)
        */
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

    await this.salvarConversa(mensagem, resposta);

    return resposta;
  }

  protected async minhaColocacaoNoConcurso(aprovado?: Aprovado): Promise<TipoRespostaMensagem>{
    //  const estatisticas = await EstatisticasRepo.buscarTempoEntreTurmas();
    if ( aprovado ){

      let resposta = ` Voce esta na ${ aprovado.posicao } posicao da ampla concorrencia`;
      if ( aprovado.ppp || aprovado.pcd ){
        //  so existe um no db

        const ranking = await RankingRepo.buscarPorPosicaoAmpla(aprovado.posicao);
        if( aprovado.ppp && ranking ){
          const pcd : Ranking | undefined = ranking.filter((r) => r.tipoRanking === valoresPadrao.TipoRanking.PCDCompleta )[0];
          resposta =  resposta.concat(`, na ${ pcd.posicaoNoRanking } posicao do ranking ppp`)
        }
        if( aprovado.pcd && ranking ){
          const ppp : Ranking | undefined = ranking.filter((r) => r.tipoRanking === valoresPadrao.TipoRanking.PPPCompleta)[0];
          resposta =  resposta.concat(` e na ${ ppp.posicaoNoRanking } posicao do ranking pcd`)
        }
      }

      return {
        novaSessao: this,
        respostas: [
          resposta,
          ...this.mensagemDeEntrada()
        ]
      }
    }

    return { 
      novaSessao: this,
      respostas: [
        `Desculpe, houve algum erro na aplicacao...Contate um administradores da aplicacao!`,
        ...this.mensagemDeEntrada()
      ]
    }
  }

  protected async quantoFaltaPraEuSerChamado( aprovado: Aprovado ): Promise<TipoRespostaMensagem>{
    //  const estatisticas = await EstatisticasRepo.buscarEstatisticasDiretoria( diretoria );
    //  Not sure if its a good idea to put these two queries together
    const ultimoEmpossado = await RankingRepo.buscarUltimaPessoaEmpossada();
    const candidatoNaLista = await RankingRepo.buscarPorPosicaoAmplaELista(
      aprovado.posicao,
      valoresPadrao.TipoRanking.ListaDeChamada2
    );

    let resposta: string; 

    if( ultimoEmpossado && candidatoNaLista ){
      const posicao = candidatoNaLista.posicaoNoRanking - ultimoEmpossado.posicaoNoRanking ;

      if( posicao > 0){
        //  a pessoa ainda nao foi chamada
        resposta = `Faltam ${ posicao } pessoas para voce ser chamado(a)! Voce esta na posicao ${ candidatoNaLista.posicaoNoRanking } da lista de chamada`
      } else {
        if( aprovado.situacao === valoresPadrao.Situacao.Empossado ){
          //  parece que alguem ja foi empossado, nao sei que...
          resposta = `Voce ja foi empossado, ora bolas!! Sua posicao na lista de chamada e ${candidatoNaLista.posicaoNoRanking}`;
        } else if( 
          //aprovado.situacao === valoresPadrao.Situacao.NaoConvocado ||
          aprovado.situacao === valoresPadrao.Situacao.Inapto ||
          aprovado.situacao === valoresPadrao.Situacao.CanceladoPorPrazo ||
          aprovado.situacao === valoresPadrao.Situacao.Desistente
        ) {
          resposta = `Parece que houve um problema na sua convocacao, pois sua situacao no site do BB e ${aprovado.situacao}
          Voce esta na posicao ${candidatoNaLista.posicaoNoRanking} da lista de chamada!`;
        } else {
          //  TODO:: matche situation value with a key/value pair, just like the UpdateManager does
          resposta = `Sua situacao e ${ aprovado.situacao } no site do bb. Voce deve ser convocado em breve! Voce esta na posicao ${candidatoNaLista.posicaoNoRanking} da lista de chamada!`;
        }
      }

      return { 
        novaSessao: this,
        respostas: [
          resposta,
          ...this.mensagemDeEntrada()
        ]
      }
    }

    return { 
      novaSessao: this,
      respostas: [
        `Houve algum erro na aplicacao, por favor contate um dos administradores!`,
        ...this.mensagemDeEntrada()
      ]
    }
  }

  protected async quaisDadosAAplicacaoArmazena(): Promise<TipoRespostaMensagem>{
    //  const estatisticas = await EstatisticasRepo.buscarEstatisticasDiretoria( diretoria );
    return { 
      novaSessao: this,
      respostas: [
        //`Essa e a resposta informando quais dados estao e como eles foram armazenados`,
        `Nome, posicao nas listas ampla, ppp e pcd, lotacao(se houver)  e situacao no concurso,conforme o site do BB`,
        `Todos os dados foram obtidos de fontes publicas. Caso deseje remover seus dados, contate um administrador da aplicacao!`,
        ...this.mensagemDeEntrada()
      ]
    }
  }

  protected async trocarSenha( parametros: ParametrosDeMensagem): Promise<TipoRespostaMensagem>{
    const trocarSenha = new AtualizarSenha( parametros );
    return{
      novaSessao: trocarSenha,
      respostas: trocarSenha.mensagemDeEntrada()
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

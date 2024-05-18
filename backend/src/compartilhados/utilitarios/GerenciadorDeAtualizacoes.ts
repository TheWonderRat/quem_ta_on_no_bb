import { valoresPadrao } from "../../SSOT/base_de_dados/exporter";
import {  Aprovado } from "../../database/ORM/modelo/exporter";
import {  
  AprovadoRepo,
  LotadoEmRepo,
  ErroDeAtualizacaoRepo
} from "../../database/ORM/repositorio/exporter";
import GerenciadorDeBots from "./GerenciadorDeBots";
import { BotsPuppeteer } from "../dependencias/exporter";
//  usada para encapsular os dados obtidos no site
//  retornando o resultado ao servico original, que pode atualizar o BD
type ChaveValorSituacao = { key: string, value: valoresPadrao.Situacao }
type ChaveValorDiretoria = { key: string, value: valoresPadrao.Diretorias }

class GerenciadorDeAtualizacoes{

  public static situacoesPossiveis: ChaveValorSituacao[] = [
    { key: 'autorizada', value: valoresPadrao.Situacao.ConvocacaoAutorizada },
    { key: 'prepara', value: valoresPadrao.Situacao.EmPreparacao },
    { key: 'cancelado', value: valoresPadrao.Situacao.CanceladoPorPrazo},
    { key: 'não convocado', value: valoresPadrao.Situacao.NaoConvocado },
    { key: 'inapto', value: valoresPadrao.Situacao.Inapto },
    { key: 'desistente', value: valoresPadrao.Situacao.Desistente },
    { key: 'qualificado', value: valoresPadrao.Situacao.Qualificado },
    { key: 'em qualificacao', value: valoresPadrao.Situacao.EmQualificacao },
    { key: 'empossado', value: valoresPadrao.Situacao.Empossado },
    { key: 'expedida', value: valoresPadrao.Situacao.ConvocacaoExpedida },
  ]
  public static lotacoesPossiveis: ChaveValorDiretoria[] = [
    { key: 'DITEC', value: valoresPadrao.Diretorias.DITEC },
    { key: 'UAN', value: valoresPadrao.Diretorias.UAN },
    { key: 'CYBER SEGURANCA', value: valoresPadrao.Diretorias.UCF },
  ]
  protected resolucaoPendente: Promise<boolean>[] ;

  public async atualizarAprovado(dado: string,aprovado: Aprovado){
    console.log(aprovado)
    //  normalizando a situacao
    //  TODO:: permitir qu exista apenas uma instancia do puppeteer atuando por vez
    const dadoLower = dado.toLowerCase();

    let situacao: valoresPadrao.Situacao | undefined = undefined;
    
    for( const st of GerenciadorDeAtualizacoes.situacoesPossiveis ){
      const rgxp = new RegExp( '(.*)' + `${st.key}` + '(.*)');
      if ( dadoLower.match(rgxp) ){
        //  salvar na base de dados
        await this.atualizarSituacao(st.value, aprovado)
        situacao = st.value;
      }
    }

    if( !situacao ){
      //  TODO:: salvar logs de erros na base de dados
      console.log(`erro na situacao do aprovado ${aprovado.nome}\n dado: ${dado}\n`)
      await ErroDeAtualizacaoRepo.cadastrarErroDeAtualizacao(
        'erro apos tentar buscar aprovados com nomes iguais num mesmo concurso',
        valoresPadrao.ErroDeAtualizacao.Puppeteer,
        aprovado.posicao
      );

    } 
    if ( situacao === valoresPadrao.Situacao.Empossado ) {
      for ( const lt of GerenciadorDeAtualizacoes.lotacoesPossiveis ){
        const rgxp = new RegExp( '(.*)' + `${lt.key}` + '(.*)');

        if ( dado.match(rgxp) ) {
          //  salvar na base de dados
          //  presume-se que os aprovados atualizados
          //  nao foram lotados ainda
          //  TODO: criar um metodo no repositorio que retorna
          //  apenas aquelas que nao foram criados
          await this.atualizarLotacao( dado, lt.value,aprovado );
        }
      }
    }
  }

  protected async atualizarSituacao(
    situacao: valoresPadrao.Situacao,
    aprovado: Aprovado
  ): Promise<void>{
    aprovado.setSituacao(situacao);
    await AprovadoRepo.save(aprovado);
  }

  protected async atualizarLotacao(
    dado: string,
    diretoria: valoresPadrao.Diretorias,
    aprovado: Aprovado
  ): Promise<void>{
    //const diretoria = lt.value;
    //  local de lotacao
    const cidade = 'Brasilia';
    const estado = 'DF' 
    await LotadoEmRepo.cadastrarLotadoEm(diretoria,aprovado.posicao,cidade, estado);
    //  data de lotacao
    const data = dado.split(' ')[3].split('.');

    const dataPosse = new Date( data[2] + '-' + data[1] + '-' + data[0]);
    aprovado.setDataPosse(dataPosse);
    await AprovadoRepo.save(aprovado);
  }
}

export default new GerenciadorDeAtualizacoes();

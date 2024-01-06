import { valoresPadrao } from "../../SSOT/base_de_dados/exporter";
import {  Aprovado } from "../../database/ORM/modelo/exporter";
import {  
  AprovadoRepo,
  LotadoEmRepo 
} from "../../database/ORM/repositorio/exporter";

//  usada para encapsular os dados obtidos no site
//  retornando o resultado ao servico original, que pode atualizar o BD
type ChaveValor = {key: string, value: string}

export default class GerenciadorDeAtualizacoes{

  public static situacoesPossiveis: ChaveValor[] = [
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
  public static lotacoesPossiveis: ChaveValor[] = [
    { key: 'DITEC', value: valoresPadrao.Diretorias.DITEC },
    { key: 'UAN', value: valoresPadrao.Diretorias.UAN },
    { key: 'CYBER SEGURANCA', value: valoresPadrao.Diretorias.UCF },
  ]

  public static async atualizarAprovado(dado: string,aprovado: Aprovado){
    //  normalizando a situacao
    const dadoLower = dado.toLowerCase();

    let erroSt = true;
    for( const st of this.situacoesPossiveis ){
      const rgxp = new RegExp( '(.*)' + `${st.key}` + '(.*)');
      
      if (dadoLower.match(rgxp)) {
        //  salvar na base de dados
        aprovado.situacao = st.value;
        await AprovadoRepo.save(aprovado);
        erroSt = false;
      }
    }

    if(erroSt){
      console.log(`erro na situacao do aprovado ${aprovado.nome}\n dado: ${dado}\n`)
    }

    for (const lt of this.lotacoesPossiveis){
      const rgxp = new RegExp( '(.*)' + `${lt.key}` + '(.*)');

      if ( dadoLower.match(rgxp)) {
        //  salvar na base de dados
        //  presume-se que os aprovados atualizados
        //  nao foram lotados ainda
        //  TODO: criar um metodo no repositorio que retorna
        //  apenas aquelas que nao foram criados
        const diretoria = lt.value;
        const cidade = 'Brasilia';
        const estado = 'DF' 
        await LotadoEmRepo.cadastrarLotadoEm(diretoria,aprovado.posicao,cidade, estado);
      }
    }
  }
}








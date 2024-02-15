import { ConversaRepo } from '../../../database/ORM/repositorio/exporter';
//import { ParametrosDeSessao } from '../../../tipos/mensagem/sessao';
import { 
  ParametrosDeLogin, 
  ParametrosDeMensagem 
} from '../../../compartilhados/utilitarios/GerenciadorDeMensagens';

export type TipoRespostaMensagem = {
  novaSessao: SessaoDeMensagem,
  respostas: string[]
} 

export abstract class SessaoDeMensagem{
  protected parametros : ParametrosDeLogin | ParametrosDeMensagem;

  constructor( parametros: ParametrosDeLogin | ParametrosDeMensagem ){
    this.parametros = parametros;
  }
  //  retorna as opcoes disponiveis para a sessao em questao
  //  como a baileys suporta botoes de interacao
  //  criar tipos para usar os botoes do whatsapp;
  //  cada elemento do array e uma mensagem enviada
  public mensagemDeEntrada(): string[]{
    return['voce esqueceu de implementar essa resposta!']
  }
  //  interface de saida do mensageiro 
  //  recebe a mensagem do cliente e return as respostas do servidor
  //  o retorno serve para atualizar a instancia que chamou a mensagem,
  //  e entao e possivel chamar as opcoes daquela classe para retornar ao cliente 
  public abstract interpretarMensagem( mensagem: string ): Promise<TipoRespostaMensagem>;

  //  serve para salvar as mensagens entre cliente e servidor
  public async salvarConversa( 
    mensagemCliente: string, 
    resposta: TipoRespostaMensagem,
    posicao?: number
  ): Promise<void>{
    await ConversaRepo.cadastrarConversa(
      this.parametros.uuidWhatsapp,
      this.parametros.criadaEm,
      new Date(),
      mensagemCliente,
      resposta.respostas.reduce((acc,r) => acc.concat(r)),
      posicao
    )
  }


  //  retorna para a sessao anterior
  //  deve funcionar como um setter interno
  protected abstract voltar(): TipoRespostaMensagem;
    
}

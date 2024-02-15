import { SessaoDeMensagem } from "./SessaoDeMensagem";

export default class Mensageiro{
  protected sessaoAtual: SessaoDeMensagem

  //  cada elemento do array e uma mensagem enviada pelo cliente
  public async interagir(mensagem: string): Promise<string[]>{

    const { novaSessao, respostas } = await this.sessaoAtual.interpretarMensagem(mensagem);
    this.setSessao(novaSessao);
    return respostas;
  }

  protected setSessao(sessao: SessaoDeMensagem){
    this.sessaoAtual = sessao;
  }

}

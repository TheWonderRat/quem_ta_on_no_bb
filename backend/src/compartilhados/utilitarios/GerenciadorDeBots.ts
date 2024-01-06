import { BotsPuppeteer } from "../dependencias/exporter";
import { Aprovado } from '../../database/ORM/modelo/exporter'
//import CapsulaAtualizarAprovado from "./GerenciadorDeAtualizacoes";


class GerenciadorDeBots{

  //  atualiza as listas da base de dados
  //  ainda nao sei se devo user websockets nesse caso
  //  por enquanto nao
  public async atualizarListas(
    captcha: string,
    aprovados: Aprovado[],
    userAgent?: string
  ): Promise<void>{
    await BotsPuppeteer.atualizarAprovados(captcha,aprovados,userAgent) ;
  }

}

export default new GerenciadorDeBots();

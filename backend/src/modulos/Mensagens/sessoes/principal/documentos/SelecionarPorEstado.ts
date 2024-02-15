import { SessaoDeMensagem, TipoRespostaMensagem } from "../../SessaoDeMensagem";
import MenuPrincipal from "../0-MenuPrincipal";
import { ParametrosDeMensagem } from '../../../../../compartilhados/utilitarios/GerenciadorDeMensagens';
import { documentacao } from "../../../../../SSOT/exporter";

//  Essa classe permite executar um callback para cada estado:
export default abstract class SelecionarPorEstado extends SessaoDeMensagem{

  protected parametros: ParametrosDeMensagem;

  public override mensagemDeEntrada(): string[] {
    return ['Digite a sigla do Estado desejado:']
  }


  //WARNING:: Typescript nao permite metodos abstratos com asyn
  //  a implementacao dos metodos DEVE conter a palavra chave async
  public async interpretarMensagem( mensagem: string ): Promise<TipoRespostaMensagem>{
    //  mais de uma pessoa com o mesmo nome
    let resposta: TipoRespostaMensagem | undefined = undefined;

    const sigla = mensagem.toUpperCase();

    switch( sigla ){
      case documentacao.SiglasEstados.AC:
        resposta = await this.Acre();
        break;
      case documentacao.SiglasEstados.AL:
        resposta = await this.Alagoas();
        break;
      case documentacao.SiglasEstados.AP:
        resposta = await this.Amapa();
        break;
      case documentacao.SiglasEstados.AM:
        resposta = await this.Amazonas();
        break;
      case documentacao.SiglasEstados.BA:
        resposta = await this.Bahia();
        break;
      case documentacao.SiglasEstados.CE:
        resposta = await this.Ceara();
        break;
      case documentacao.SiglasEstados.DF:
        resposta = await this.DistritoFederal();
        break;
      case documentacao.SiglasEstados.ES:
        resposta = await this.EspiritoSanto();
        break;
      case documentacao.SiglasEstados.GO:
        resposta = await this.Goais();
        break;
      case documentacao.SiglasEstados.MA:
        resposta = await this.Maranhao();
        break;
      case documentacao.SiglasEstados.MT:
        resposta = await this.MatoGrosso();
        break;
      case documentacao.SiglasEstados.MG:
        resposta = await this.MinasGerais();
        break;
      case documentacao.SiglasEstados.PA:
        resposta = await this.Para();
        break;
      case documentacao.SiglasEstados.PB:
        resposta = await this.Paraiba();
        break;
      case documentacao.SiglasEstados.PR:
        resposta = await this.Parana();
        break;
      case documentacao.SiglasEstados.PI:
        resposta = await this.Piau();
        break;
      case documentacao.SiglasEstados.RJ:
        resposta = await this.RioDeJaneiro();
        break;
      case documentacao.SiglasEstados.RS:
        resposta = await this.RioGrandeDoSul();
        break;
      case documentacao.SiglasEstados.RO:
        resposta = await this.Rondonia();
        break;
      case documentacao.SiglasEstados.RR:
        resposta = await this.Roraima();
        break;
      case documentacao.SiglasEstados.SC:
        resposta = await this.SantaCatarina();
        break;
      case documentacao.SiglasEstados.SP:
        resposta = await this.SaoPaulo();
        break;
      case documentacao.SiglasEstados.TO:
        resposta = await this.Tocantis();
        break;
      default:
        resposta = { 
          novaSessao: this,
          respostas: [
            `Opcao invalida!: ${ mensagem } nao e uma sigla de estado!`,
            'Selecione uma das opcoes abaixo:',
            ...this.mensagemDeEntrada()
          ]
        }
    }

    await this.salvarConversa(mensagem,resposta, this.parametros.aprovado.posicao);
    return resposta;
  }

  protected abstract Acre() : Promise<TipoRespostaMensagem>;

  protected abstract Alagoas() : Promise<TipoRespostaMensagem>;

  protected abstract Amapa() : Promise<TipoRespostaMensagem>;

  protected abstract Amazonas() : Promise<TipoRespostaMensagem>;

  protected abstract Bahia() : Promise<TipoRespostaMensagem>;

  protected abstract Ceara() : Promise<TipoRespostaMensagem>;

  protected abstract DistritoFederal() : Promise<TipoRespostaMensagem>;

  protected abstract EspiritoSanto() : Promise<TipoRespostaMensagem>;

  protected abstract Goais() : Promise<TipoRespostaMensagem>;

  protected abstract Maranhao() : Promise<TipoRespostaMensagem>;

  protected abstract MatoGrosso() : Promise<TipoRespostaMensagem>;

  protected abstract MatoGrossoDoSul() : Promise<TipoRespostaMensagem>;

  protected abstract MinasGerais() : Promise<TipoRespostaMensagem>;

  protected abstract Para() : Promise<TipoRespostaMensagem>;

  protected abstract Paraiba() : Promise<TipoRespostaMensagem>;

  protected abstract Parana() : Promise<TipoRespostaMensagem>;

  protected abstract Pernambuco() : Promise<TipoRespostaMensagem>;

  protected abstract Piau() : Promise<TipoRespostaMensagem>;

  protected abstract RioDeJaneiro() : Promise<TipoRespostaMensagem>;

  protected abstract RioGrandeDoNorte() : Promise<TipoRespostaMensagem>;

  protected abstract RioGrandeDoSul() : Promise<TipoRespostaMensagem>;

  protected abstract Rondonia() : Promise<TipoRespostaMensagem>;

  protected abstract Roraima() : Promise<TipoRespostaMensagem>;

  protected abstract SantaCatarina() : Promise<TipoRespostaMensagem>;

  protected abstract SaoPaulo() : Promise<TipoRespostaMensagem>;

  protected abstract Sergipe() : Promise<TipoRespostaMensagem>;

  protected abstract Tocantis() : Promise<TipoRespostaMensagem>;
}

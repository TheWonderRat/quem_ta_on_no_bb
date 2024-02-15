import { TipoRespostaMensagem } from "../../SessaoDeMensagem";
import MenuPrincipal from "../0-MenuPrincipal";
import { ParametrosDeMensagem } from '../../../../../compartilhados/utilitarios/GerenciadorDeMensagens';
import { documentacao } from "../../../../../SSOT/exporter";
import SelecionarPorEstado from "./SelecionarPorEstado";
import MenuDocumentos from "./0-MenuDocumentos";

//  Essa classe permite executar um callback para cada estado:
export default class CertidaoNegativaEstadual extends SelecionarPorEstado{

  protected parametros: ParametrosDeMensagem;

  protected async Acre() : Promise<TipoRespostaMensagem>{
    //mensagem deve instruir como proceder
    const sessao = new MenuDocumentos( this.parametros ) ;
    const mensagem = `Pode ser encontrada no link abaixo!\n\n${documentacao.CertidaoNegativaEstadual.AC}`;
    return {
      novaSessao: sessao,
      respostas: [
        mensagem,
        ...sessao.mensagemDeEntrada()
      ]
    }
  }

  protected async Alagoas() : Promise<TipoRespostaMensagem>{
    //mensagem deve instruir como proceder
    const sessao = new MenuDocumentos( this.parametros ) ;
    const mensagem = `Pode ser encontrada no link abaixo!\n\n${documentacao.CertidaoNegativaEstadual.AL}`;
    return {
      novaSessao: sessao,
      respostas: [
        mensagem,
        ...sessao.mensagemDeEntrada()
      ]
    }
  }

  protected async Amapa() : Promise<TipoRespostaMensagem>{
    //mensagem deve instruir como proceder
    const sessao = new MenuDocumentos( this.parametros ) ;
    const mensagem = `Pode ser encontrada no link abaixo!\n\n${documentacao.CertidaoNegativaEstadual.AP}`;
    return {
      novaSessao: sessao,
      respostas: [
        mensagem,
        ...sessao.mensagemDeEntrada()
      ]
    }
  }

  protected async Amazonas() : Promise<TipoRespostaMensagem>{
    //mensagem deve instruir como proceder
    const sessao = new MenuDocumentos( this.parametros ) ;
    const mensagem = `Pode ser encontrada no link abaixo!\n\n${documentacao.CertidaoNegativaEstadual.AM}`;
    return {
      novaSessao: sessao,
      respostas: [
        mensagem,
        ...sessao.mensagemDeEntrada()
      ]
    }
  }

  protected async Bahia() : Promise<TipoRespostaMensagem>{
    //mensagem deve instruir como proceder
    const sessao = new MenuDocumentos( this.parametros ) ;
    const mensagem = `Pode ser encontrada no link abaixo!\n\n${documentacao.CertidaoNegativaEstadual.BA}`;
    return {
      novaSessao: sessao,
      respostas: [
        mensagem,
        ...sessao.mensagemDeEntrada()
      ]
    }
  }

  protected async Ceara() : Promise<TipoRespostaMensagem>{
    //mensagem deve instruir como proceder
    const sessao = new MenuDocumentos( this.parametros ) ;
    const mensagem = `Pode ser encontrada no link abaixo!\n\n${documentacao.CertidaoNegativaEstadual.CE}`;
    return {
      novaSessao: sessao,
      respostas: [
        mensagem,
        ...sessao.mensagemDeEntrada()
      ]
    }
  }

  protected async DistritoFederal() : Promise<TipoRespostaMensagem>{
    //mensagem deve instruir como proceder
    const sessao = new MenuDocumentos( this.parametros ) ;
    const mensagem = `Pode ser encontrada no link abaixo!\n\n${documentacao.CertidaoNegativaEstadual.DF}`;
    return {
      novaSessao: sessao,
      respostas: [
        mensagem,
        ...sessao.mensagemDeEntrada()
      ]
    }
  }

  protected async EspiritoSanto() : Promise<TipoRespostaMensagem>{
    //mensagem deve instruir como proceder
    const sessao = new MenuDocumentos( this.parametros ) ;
    const mensagem = `Pode ser encontrada no link abaixo!\n\n${documentacao.CertidaoNegativaEstadual.ES}`;
    return {
      novaSessao: sessao,
      respostas: [
        mensagem,
        ...sessao.mensagemDeEntrada()
      ]
    }
  }

  protected async Goais() : Promise<TipoRespostaMensagem>{
    //mensagem deve instruir como proceder
    const sessao = new MenuDocumentos( this.parametros ) ;
    const mensagem = `Pode ser encontrada no link abaixo!\n\n${documentacao.CertidaoNegativaEstadual.GO}`;
    return {
      novaSessao: sessao,
      respostas: [
        mensagem,
        ...sessao.mensagemDeEntrada()
      ]
    }
  }

  protected async Maranhao() : Promise<TipoRespostaMensagem>{
    //mensagem deve instruir como proceder
    const sessao = new MenuDocumentos( this.parametros ) ;
    const mensagem = `Pode ser encontrada no link abaixo!\n\n${documentacao.CertidaoNegativaEstadual.MA}`;
    return {
      novaSessao: sessao,
      respostas: [
        mensagem,
        ...sessao.mensagemDeEntrada()
      ]
    }
  }

  protected async MatoGrosso() : Promise<TipoRespostaMensagem>{
    //mensagem deve instruir como proceder
    const sessao = new MenuDocumentos( this.parametros ) ;
    const mensagem = `Pode ser encontrada no link abaixo!\n\n${documentacao.CertidaoNegativaEstadual.MT}`;
    return {
      novaSessao: sessao,
      respostas: [
        mensagem,
        ...sessao.mensagemDeEntrada()
      ]
    }
  }

  protected async MatoGrossoDoSul() : Promise<TipoRespostaMensagem>{
    //mensagem deve instruir como proceder
    const sessao = new MenuDocumentos( this.parametros ) ;
    const mensagem = `Pode ser encontrada no link abaixo!\n\n${documentacao.CertidaoNegativaEstadual.MS}`;
    return {
      novaSessao: sessao,
      respostas: [
        mensagem,
        ...sessao.mensagemDeEntrada()
      ]
    }
  }

  protected async MinasGerais() : Promise<TipoRespostaMensagem>{
    //mensagem deve instruir como proceder
    const sessao = new MenuDocumentos( this.parametros ) ;
    const mensagem = `Pode ser encontrada no link abaixo!\n\n${documentacao.CertidaoNegativaEstadual.MG}`;
    return {
      novaSessao: sessao,
      respostas: [
        mensagem,
        ...sessao.mensagemDeEntrada()
      ]
    }
  }

  protected async Para() : Promise<TipoRespostaMensagem>{
    //mensagem deve instruir como proceder
    const sessao = new MenuDocumentos( this.parametros ) ;
    const mensagem = `Pode ser encontrada no link abaixo!\n\n${documentacao.CertidaoNegativaEstadual.PA}`;
    return {
      novaSessao: sessao,
      respostas: [
        mensagem,
        ...sessao.mensagemDeEntrada()
      ]
    }
  }

  protected async Paraiba() : Promise<TipoRespostaMensagem>{
    //mensagem deve instruir como proceder
    const sessao = new MenuDocumentos( this.parametros ) ;
    const mensagem = `Pode ser encontrada no link abaixo!\n\n${documentacao.CertidaoNegativaEstadual.PB}`;
    return {
      novaSessao: sessao,
      respostas: [
        mensagem,
        ...sessao.mensagemDeEntrada()
      ]
    }
  }

  protected async Parana() : Promise<TipoRespostaMensagem>{
    //mensagem deve instruir como proceder
    const sessao = new MenuDocumentos( this.parametros ) ;
    const mensagem = `Infelizmente nao pode ser obtida pela internet. As instrucoes para emissao estao no link abaixo!\n\n${documentacao.CertidaoNegativaEstadual.PR}`;
    return {
      novaSessao: sessao,
      respostas: [
        mensagem,
        ...sessao.mensagemDeEntrada()
      ]
    }
  }

  protected async Pernambuco() : Promise<TipoRespostaMensagem>{
    //mensagem deve instruir como proceder
    const sessao = new MenuDocumentos( this.parametros ) ;
    const mensagem = `Pode ser encontrada no link abaixo!\n\n${documentacao.CertidaoNegativaEstadual.PE}`;
    return {
      novaSessao: sessao,
      respostas: [
        mensagem,
        ...sessao.mensagemDeEntrada()
      ]
    }
  }

  protected async Piau() : Promise<TipoRespostaMensagem>{
    //mensagem deve instruir como proceder
    const sessao = new MenuDocumentos( this.parametros ) ;
    const mensagem = `Pode ser encontrada no link abaixo!\n\n${documentacao.CertidaoNegativaEstadual.PI}`;
    return {
      novaSessao: sessao,
      respostas: [
        mensagem,
        ...sessao.mensagemDeEntrada()
      ]
    }
  }

  protected async RioDeJaneiro() : Promise<TipoRespostaMensagem>{
    //mensagem deve instruir como proceder
    const sessao = new MenuDocumentos( this.parametros ) ;
    const mensagem = `Pode ser encontrada no link abaixo! Selecione finalidade CONCURSO\n\n${documentacao.CertidaoNegativaEstadual.RJ}`;
    return {
      novaSessao: sessao,
      respostas: [
        mensagem,
        ...sessao.mensagemDeEntrada()
      ]
    }
  }

  protected async RioGrandeDoNorte() : Promise<TipoRespostaMensagem>{
    //mensagem deve instruir como proceder
    const sessao = new MenuDocumentos( this.parametros ) ;
    const mensagem = `Pode ser encontrada no link abaixo!\n\n${documentacao.CertidaoNegativaEstadual.RN}`;
    return {
      novaSessao: sessao,
      respostas: [
        mensagem,
        ...sessao.mensagemDeEntrada()
      ]
    }
  }

  protected async RioGrandeDoSul() : Promise<TipoRespostaMensagem>{
    //mensagem deve instruir como proceder
    const sessao = new MenuDocumentos( this.parametros ) ;
    const mensagem = `Pode ser encontrada no link abaixo! Selecione CERTIDAO JUDICIAL CRIMINAL NEGATIVA\n\n${documentacao.CertidaoNegativaEstadual.RS}`;
    return {
      novaSessao: sessao,
      respostas: [
        mensagem,
        ...sessao.mensagemDeEntrada()
      ]
    }
  }

  protected async Rondonia() : Promise<TipoRespostaMensagem>{
    //mensagem deve instruir como proceder
    const sessao = new MenuDocumentos( this.parametros ) ;
    const mensagem = `Pode ser encontrada no link abaixo!\n\n${documentacao.CertidaoNegativaEstadual.RO}`;
    return {
      novaSessao: sessao,
      respostas: [
        mensagem,
        ...sessao.mensagemDeEntrada()
      ]
    }
  }

  protected async Roraima() : Promise<TipoRespostaMensagem>{
    //mensagem deve instruir como proceder
    const sessao = new MenuDocumentos( this.parametros ) ;
    const mensagem = `Pode ser encontrada no link abaixo!\n\n${documentacao.CertidaoNegativaEstadual.RR}`;
    return {
      novaSessao: sessao,
      respostas: [
        mensagem,
        ...sessao.mensagemDeEntrada()
      ]
    }
  }

  protected async SantaCatarina() : Promise<TipoRespostaMensagem>{
    //mensagem deve instruir como proceder
    const sessao = new MenuDocumentos( this.parametros ) ;
    const mensagem = `Pode ser encontrada no link abaixo!\n\n${documentacao.CertidaoNegativaEstadual.SC}`;
    return {
      novaSessao: sessao,
      respostas: [
        mensagem,
        ...sessao.mensagemDeEntrada()
      ]
    }
  }

  protected async SaoPaulo() : Promise<TipoRespostaMensagem>{
    //mensagem deve instruir como proceder
    const sessao = new MenuDocumentos( this.parametros ) ;
    const mensagem = `Pode ser encontrada no link abaixo!\n\n${documentacao.CertidaoNegativaEstadual.SP}`;
    return {
      novaSessao: sessao,
      respostas: [
        mensagem,
        ...sessao.mensagemDeEntrada()
      ]
    }
  }

  protected async Sergipe() : Promise<TipoRespostaMensagem>{
    //mensagem deve instruir como proceder
    const sessao = new MenuDocumentos( this.parametros ) ;
    const mensagem = `Pode ser encontrada no link abaixo!\n\n${documentacao.CertidaoNegativaEstadual.SE}`;
    return {
      novaSessao: sessao,
      respostas: [
        mensagem,
        ...sessao.mensagemDeEntrada()
      ]
    }
  }

  protected async Tocantis() : Promise<TipoRespostaMensagem>{
    //mensagem deve instruir como proceder
    const sessao = new MenuDocumentos( this.parametros ) ;
    const mensagem = `Pode ser encontrada no link abaixo!\n\n${documentacao.CertidaoNegativaEstadual.TO}`;
    return {
      novaSessao: sessao,
      respostas: [
        mensagem,
        ...sessao.mensagemDeEntrada()
      ]
    }
  }

  //TODO:: voltar para o menu da documentacao
  protected voltar(): TipoRespostaMensagem{
    const menu = new MenuPrincipal( this.parametros );
    return { 
      novaSessao: menu,
      respostas: menu.mensagemDeEntrada()
    }
  }
}


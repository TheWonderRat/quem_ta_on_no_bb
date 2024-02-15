import { TipoRespostaMensagem } from "../../SessaoDeMensagem";
import MenuPrincipal from "../0-MenuPrincipal";
import { ParametrosDeMensagem } from '../../../../../compartilhados/utilitarios/GerenciadorDeMensagens';
import { documentacao } from "../../../../../SSOT/exporter";
import SelecionarPorEstado from "./SelecionarPorEstado";
import MenuDocumentos from "./0-MenuDocumentos";

//  Essa classe permite executar um callback para cada estado:
export default class FolhaDeAntecedentesEstadual extends SelecionarPorEstado{

  protected parametros: ParametrosDeMensagem;

  public async interpretarMensagem(mensagem: string): Promise<TipoRespostaMensagem> {
     //mensagem deve instruir como proceder
    const novaSessao = new MenuDocumentos( this.parametros ) ;
    const msg = 'Ainda estamos implementando essa opcao!\
                Precisamos encontrar todos os links e tambem testar a documentacao\
                Procure no grupo pelo administrador da aplicacao se quiser ajudar!';
    return {
      novaSessao,
      respostas: [
        msg,
        ...novaSessao.mensagemDeEntrada()
      ]
    }     
  }

  protected async Acre() : Promise<TipoRespostaMensagem>{
    //mensagem deve instruir como proceder
    const sessao = new MenuDocumentos( this.parametros ) ;
    const mensagem = `Pode ser encontrada no link abaixo!\n\n${documentacao.FolhaAntecedentesEstadual.AC}`;
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
    const mensagem = `Pode ser encontrada no link abaixo!\n\n${documentacao.FolhaAntecedentesEstadual.AL}`;
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
    const mensagem = `Pode ser encontrada no link abaixo!\n\n${documentacao.FolhaAntecedentesEstadual.AP}`;
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
    const mensagem = `Pode ser encontrada no link abaixo!\n\n${documentacao.FolhaAntecedentesEstadual.AM}`;
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
    const mensagem = `Pode ser encontrada no link abaixo!\n\n${documentacao.FolhaAntecedentesEstadual.BA}`;
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
    const mensagem = `Pode ser encontrada no link abaixo!\n\n${documentacao.FolhaAntecedentesEstadual.CE}`;
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
    const mensagem = `Pode ser encontrada no link abaixo!\n\n${documentacao.FolhaAntecedentesEstadual.DF}`;
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
    const mensagem = `Pode ser encontrada no link abaixo!\n\n${documentacao.FolhaAntecedentesEstadual.ES}`;
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
    const mensagem = `Pode ser encontrada no link abaixo!\n\n${documentacao.FolhaAntecedentesEstadual.GO}`;
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
    const mensagem = `Pode ser encontrada no link abaixo!\n\n${documentacao.FolhaAntecedentesEstadual.MA}`;
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
    const mensagem = `Pode ser encontrada no link abaixo!\n\n${documentacao.FolhaAntecedentesEstadual.MT}`;
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
    const mensagem = `Pode ser encontrada no link abaixo!\n\n${documentacao.FolhaAntecedentesEstadual.MS}`;
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
    const mensagem = `Pode ser encontrada no link abaixo!\n\n${documentacao.FolhaAntecedentesEstadual.MG}`;
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
    const mensagem = `Pode ser encontrada no link abaixo!\n\n${documentacao.FolhaAntecedentesEstadual.PA}`;
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
    const mensagem = `Pode ser encontrada no link abaixo!\n\n${documentacao.FolhaAntecedentesEstadual.PB}`;
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
    const mensagem = `Infelizmente nao pode ser obtida pela internet. As instrucoes para emissao estao no link abaixo!\n\n${documentacao.FolhaAntecedentesEstadual.PR}`;
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
    const mensagem = `Pode ser encontrada no link abaixo!\n\n${documentacao.FolhaAntecedentesEstadual.PE}`;
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
    const mensagem = `Pode ser encontrada no link abaixo!\n\n${documentacao.FolhaAntecedentesEstadual.PI}`;
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
    const mensagem = `Pode ser encontrada no link abaixo! Selecione finalidade CONCURSO\n\n${documentacao.FolhaAntecedentesEstadual.RJ}`;
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
    const mensagem = `Pode ser encontrada no link abaixo!\n\n${documentacao.FolhaAntecedentesEstadual.RN}`;
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
    const mensagem = `Pode ser encontrada no link abaixo! Selecione CERTIDAO JUDICIAL CRIMINAL NEGATIVA\n\n${documentacao.FolhaAntecedentesEstadual.RS}`;
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
    const mensagem = `Pode ser encontrada no link abaixo!\n\n${documentacao.FolhaAntecedentesEstadual.RO}`;
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
    const mensagem = `Pode ser encontrada no link abaixo!\n\n${documentacao.FolhaAntecedentesEstadual.RR}`;
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
    const mensagem = `Pode ser encontrada no link abaixo!\n\n${documentacao.FolhaAntecedentesEstadual.SC}`;
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
    const mensagem = `Pode ser encontrada no link abaixo!\n\n${documentacao.FolhaAntecedentesEstadual.SP}`;
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
    const mensagem = `Pode ser encontrada no link abaixo!\n\n${documentacao.FolhaAntecedentesEstadual.SE}`;
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
    const mensagem = `Pode ser encontrada no link abaixo!\n\n${documentacao.FolhaAntecedentesEstadual.TO}`;
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


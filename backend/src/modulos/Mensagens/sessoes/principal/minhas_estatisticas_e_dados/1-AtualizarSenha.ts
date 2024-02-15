//  permite que o usuario de alguma sugestao aos desenvolvedores
//  tem a opcao de voltar para a sessao principal
import { SessaoDeMensagem, TipoRespostaMensagem } from '../../SessaoDeMensagem';
import CriptografiaBcrypt from '../../../../../compartilhados/dependencias/CriptografiaBcrypt';
import { ParametrosDeMensagem } from '../../../../../compartilhados/utilitarios/GerenciadorDeMensagens';
import MinhasEstatisticasEDados from './0-MinhasEstatisticasEDados';
import { AprovadoRepo } from '../../../../../database/ORM/repositorio/exporter';


enum EstagioTrocaSenha{
  NaoIniciado = 'nao_iniciado',
  ErrouASenha = 'errou_senha',
  SenhaCorreta = 'senha_correta',
};

export default class AtualizarSenha extends SessaoDeMensagem {
  //  se o usuario estiver na base de dados, retorna a classe de pergutna missao
  //  se o usuario nao for encontrado, retorna para a sessao anterior se os usuarios tiverem nomes repetidos, retorna a classe que pergunta pela inscricao
  //  se apenas um usuario for encontrado, parte para a pergunta da missao
  protected estado: EstagioTrocaSenha;
  protected parametros: ParametrosDeMensagem;

  constructor(
    parametros: ParametrosDeMensagem,
  ){
    super(parametros);
    this.estado = EstagioTrocaSenha.NaoIniciado;
  }

  protected setEstado(estado: EstagioTrocaSenha){
    this.estado = estado;
  }

  public mensagemDeEntrada(): string[] {
    return [
      "Digite sua senha atual, ou envie 0 para encerrar o processo e voltar ao menu de estatisticas"
    ]
  }

  public async interpretarMensagem( mensagem: string ): Promise<TipoRespostaMensagem>{

    if(Number(mensagem) === 0){
      return this.voltar();
    }

    let resposta: TipoRespostaMensagem | undefined = undefined;

    switch( this.estado ){
      //  fazer contagem de erros?
      /*
       * por que nao funciona e o lsp nao acusa erro?
      case EstagioTrocaSenha.NaoIniciado || EstagioTrocaSenha.ErrouASenha:
        resposta = await this.trocarSenha(this.parametros, mensagem); break;
        */
      case EstagioTrocaSenha.NaoIniciado:
        resposta = await this.trocarSenha(this.parametros, mensagem); break;
      case EstagioTrocaSenha.ErrouASenha:
        resposta = await this.trocarSenha(this.parametros, mensagem); break;
      case EstagioTrocaSenha.SenhaCorreta:
        resposta = await this.salvarNovaSenha(this.parametros, mensagem); break;
    }

    if( !resposta){
      const menu = new MinhasEstatisticasEDados( this.parametros );
      resposta = {
        novaSessao: menu,
        respostas: [
          "Alguma coisa deu errado no processo, contate um dos administradores da aplicacao!"
        ]
      }
    }

    await this.salvarConversa(mensagem,resposta); 
    return resposta;
  }
  //  checa see a senha antiga confere com a senha do usuario
  protected async trocarSenha( 
    parametros: ParametrosDeMensagem, 
    senha: string 
  ): Promise<TipoRespostaMensagem>{
    const matched = await CriptografiaBcrypt.compararSenha(parametros.aprovado.senha, senha);

    let resposta: TipoRespostaMensagem;

    if( matched ){
      resposta = { 
        novaSessao: this,
        respostas: [
          'Digite uma nova senha ou envie 0 para encerrar o processo'
        ]
      };     
      this.setEstado(EstagioTrocaSenha.SenhaCorreta)
    } else {
      resposta = { 
        novaSessao: this,
        respostas: [
          'As senhas nao conferem, tente novamente!',
          ...this.mensagemDeEntrada() 
        ]
      }; 
      this.setEstado(EstagioTrocaSenha.ErrouASenha)
    } 
    
    return resposta; //  trocar estado
  }
  //  pede por uma nova senha
  protected async salvarNovaSenha( 
    parametros: ParametrosDeMensagem, 
    senha: string 
  ): Promise<TipoRespostaMensagem>{
    
    const senhaCriptografada = await CriptografiaBcrypt.criptografarSenha(senha);
    this.parametros.aprovado.setSenha(senhaCriptografada);
    //  this.setEstado(EstagioTrocaSenha.SenhaTrocada)
    //  trocar estado
    const estatisticas = new MinhasEstatisticasEDados(this.parametros);
    return { 
      novaSessao: estatisticas,
      respostas: [
        'Sua senha foi trocada com sucesso!',
        ...estatisticas.mensagemDeEntrada(), 
      ]
    };
  }

  //  tambem nao vai acontecer, pois volta direto para a sessao anterior
  protected voltar(): TipoRespostaMensagem{
    const estatisticas = new MinhasEstatisticasEDados(this.parametros);
    return {
      novaSessao: estatisticas,
      respostas: estatisticas.mensagemDeEntrada()
    } 
  }
}

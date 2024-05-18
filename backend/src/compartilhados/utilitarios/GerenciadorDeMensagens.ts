import { SessaoDeMensagem } from "../../modulos/Mensagens/sessoes/SessaoDeMensagem";
import PerguntaNome from "../../modulos/Mensagens/sessoes/login/1-PerguntaNome";
import { Aprovado, ErroDeAtualizacao } from "../../database/ORM/modelo/exporter";
import { ErroDeAtualizacaoRepo } from "../../database/ORM/repositorio/exporter"

//  TODO:: organizar melhor
export class ParametrosDeMensagem{
  public readonly aprovado: Aprovado;
  public readonly uuidWhatsapp: string;
  public readonly criadaEm: Date;


  constructor(
    uuidWhatsapp: string,
    criadaEm: Date,
    aprovado: Aprovado,
  ){
    this.aprovado = aprovado;
    this.uuidWhatsapp = uuidWhatsapp;
    this.criadaEm = criadaEm;
  }
}

export class ParametrosDeLogin{
  uuidWhatsapp: string;
  criadaEm: Date;

  constructor(
    uuidWhatsapp: string,
    criadaEm: Date,
  ){
    this.uuidWhatsapp = uuidWhatsapp;
    this.criadaEm = criadaEm;
  }
}

class UsuarioLogado{
  //  usado para a indexacao do gerenciador
  public readonly indice: number;
  public readonly clientUUID: string;
  public readonly criadaEm: Date;
  protected sessao: SessaoDeMensagem;
  protected ultimaInteracao: Date;

  constructor(
    //  identificados do whatsapp para um numero
    //  TODO:: descobrir como tratar os dados recebidos do whatsapp
    clientUUID: string,

  ){
    this.clientUUID= clientUUID;
    this.indice = UsuarioLogado.gerarIndice(this.clientUUID);
    this.criadaEm = new Date()
    //  TODO:: checar se o usuario e verificado pelo uuid
    //  se sim, vamos direto para o menu principal
    //  se nao, para o menu de login
    //  no nosso caso, iremos sempre para a primeira pergunta
    this.sessao = new PerguntaNome(new ParametrosDeLogin(clientUUID,this.criadaEm));
  }

  //  WARNING:: gera errors se o parametro errado for passado
  //  funciona apenas com numeros do whatsapp
  public static gerarIndice(uuidWhats: string): number {
    //  inserir aqui quando surgirem caracteres especiais no numero do whats
    let whatsNumber = ''
    for( const l of uuidWhats){
      if( isNaN(Number(l)) ) {
        break;
      }
      whatsNumber = whatsNumber.concat(l)
    }
    return Number(whatsNumber);
  }

  protected setSessao( sessao: SessaoDeMensagem ){
    this.sessao = sessao;
  }

  public getMensagemAtual(){
    return this.sessao.mensagemDeEntrada();
  }

  public async interagir( mensagem: string ): Promise<string[]>{
    const { novaSessao, respostas }= await this.sessao.interpretarMensagem( mensagem );
    this.setSessao( novaSessao );
    this.renovarSessao();

    return respostas;
  }

  public getTempoLogado(): number {
    return new Date().getTime() - this.ultimaInteracao.getTime();
  }

  public renovarSessao(){
    this.ultimaInteracao = new Date();
  }
}

class GerenciadorDeMensagens{
  protected tempoExpiraSecao: number;
  protected usuariosLogados: UsuarioLogado[];

  constructor(
    //  tempo maximo que um usuario pode estar logado sem interagir enviar mensagens
    tempoExpiraSecao: number = 3_600_000,
  ){
    this.tempoExpiraSecao = tempoExpiraSecao;
    this.usuariosLogados = [];
  }

  // recebe mensagem tanto dos usuarios logados quanto os nao logado
  public async receberMensagem( 
    // numero de telefone do usario
    //  indice: number,
    clientUUID: string,
    mensagem: string 
  ): Promise<string[]>{
      const indice = UsuarioLogado.gerarIndice(clientUUID);

      const onFound = async ( lSup: number, lInf: number, ptr: number ): Promise<string[]> => {
        //  interage com o usuario, pois ele ja esta logado
        const usuario: UsuarioLogado =  this.usuariosLogados[ptr];
        //  talvez eu deva criar um tipo de interacao, ver depois
        const mensagens = await usuario.interagir(mensagem)
        return mensagens;
      }
      
      //  insere um novo usuario, pois o numero nao tem sessao aberta
      const onNotFound = async ( lSup: number, lInf: number, ponteiro: number ): Promise<string[]> => {
        if ( this.usuariosLogados.length === 0 ){
          const usuario = new UsuarioLogado( clientUUID);
          this.usuariosLogados.push( usuario );
          return usuario.getMensagemAtual();
        } else {
          const direita = this.usuariosLogados[ lSup ].indice < indice;
          const esquerda = this.usuariosLogados[ lInf ].indice > indice;
          let posicao = lInf + 1;
          
          if ( direita ){
            posicao = lSup + 1;
          } else if ( esquerda ){
            posicao = lInf;
          }
          const usuario = new UsuarioLogado(clientUUID);
          this.usuariosLogados.splice( posicao, 0, usuario);
          return usuario.getMensagemAtual();
        }
      };

    return this.buscarUsuario( indice,onFound, onNotFound )
      .then((ok) => ok)
      .catch((err) => err)
  }

  protected buscarUsuario(
    indice: number,
    aoEncontrar: ( lSp: number, lInf: number, ponteiro: number ) => Promise<string[]>,
    aoNaoEncontrar: ( lSp: number, lInf: number, ponteiro: number ) => Promise<string[]>,
  ): Promise<string[]>{


    if( this.usuariosLogados.length < 1){
      return aoNaoEncontrar(0, 0, 0);
    }

    let limSup = this.usuariosLogados.length - 1;
    let limInf = 0;
    let ponteiro = 0;

    while ( limSup - limInf > 1) {
      ponteiro = limInf + Math.floor(( limSup - limInf ) / 2 );

      if( this.usuariosLogados[ponteiro].indice> indice ){
        limSup = ponteiro;
      } else if( this.usuariosLogados[ponteiro].indice < indice ){
        limInf = ponteiro;
      }

      if ( this.usuariosLogados[ponteiro].indice === indice){
        return aoEncontrar(limSup,limInf,ponteiro);
      }
    }
    if( this.usuariosLogados[limSup].indice === indice ){
      return aoEncontrar(limSup,limInf,limSup);
    } else if( this.usuariosLogados[limInf].indice === indice ){
      return aoEncontrar(limSup,limInf,limInf);
    }

    return aoNaoEncontrar(limSup, limInf, ponteiro);
  }

  public removerSessoesExpiradas(){
    for( let i = 0; i < this.usuariosLogados.length; i++ ){
      if ( this.usuariosLogados[i].getTempoLogado() > this.tempoExpiraSecao ){
        this.usuariosLogados.splice(i,1);
      }
    }
  }
}

export default new GerenciadorDeMensagens()

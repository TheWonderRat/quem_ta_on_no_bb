import { 
  Entity, 
  Column, 
  PrimaryColumn, 
  ManyToOne, 
  JoinColumn, 
  OneToOne, 
  OneToMany, 
  CreateDateColumn, 
  UpdateDateColumn, 
  DeleteDateColumn, 
} from 'typeorm'
import { 
  atributos, 
  entidades, 
  valoresPadrao
} from '../../../SSOT/base_de_dados//exporter';
import { 
  Contato, 
  LotadoEm, 
  Situacao, 
  Turma,
  Ranking,
  Sugestao,
  Conversa,
  ErroDeAtualizacao,
  Notificacao
} from '../modelo/exporter';

//TODO:: inserir no arquivo de constantes
@Entity( entidades.Aprovado )
export default class Aprovado{

  @PrimaryColumn({name: atributos.Aprovado.PosicaoAmpla , type: 'smallint'})
  posicao: number;

  @Column({name: atributos.Aprovado.Inscricao, unique: true, type: 'varchar'})
  inscricao: string;

  @Column({name: atributos.Aprovado.Nome})
  nome: string;

  @Column({name: atributos.Aprovado.Senha})
  senha: string;

  @Column({name: atributos.Aprovado.Situacao})
  situacao: string;

  @Column({name: atributos.Aprovado.Turma,nullable: true})
  turma?: number;

  @Column({ name: atributos.Aprovado.DataPosse, nullable: true })
  dataPosse: Date;

  @Column({ name: atributos.Aprovado.Ativo, default: false })
  ativado: boolean;

  @Column({ name: atributos.Aprovado.PPP })
  ppp: boolean;

  @Column({ name: atributos.Aprovado.PCD ,default: false })
  pcd: boolean;
  
  @CreateDateColumn()
  criadoEm: Date;

  @UpdateDateColumn()
  atualizadoEm: Date;

  @DeleteDateColumn()
  excluidoEm: Date;

  /*-------------------------------joins------------------------------*/
  //  @ManyToMany(() => Notificacao,(notificacao) => notificacao.tipo)
  //  notificacoes: Notificacao[]

  //as joins devem ter exatamente o mesmo nome das contantes de SSOT/base_de_dados/relacionamentos
  @OneToOne(() => LotadoEm, (lotadoEm) => lotadoEm.aprovadoVinculado)
  //TODO:: inserir os nomes dos atributos no SSOT
  lotadoEm: LotadoEm;

  @ManyToOne(() => Situacao,(situacao)=> situacao.aprovadosNaSituacao)
  //TODO:: inserir os nomes dos atributos no SSOT
  @JoinColumn({name: atributos.Aprovado.Situacao})
  situacaoVinculada: Situacao;

  @ManyToOne(() => Turma,(turma)=> turma.aprovadosDaTurma)
  //TODO:: inserir os nomes dos atributos no SSOT
  @JoinColumn({name: atributos.Aprovado.Turma})
  turmaVinculada: Turma;

  @OneToOne(() => Contato, (contato) => contato.aprovadoVinculado)
  //TODO:: inserir os nomes dos atributos no SSOT
  contatoDoAprovado: Contato;

  @OneToMany(() => Ranking, (ranking) => ranking.aprovadoVinculado)
  rankingsDoAprovado: Ranking[];

  @OneToMany(() => Sugestao, (sugestao) => sugestao.aprovadoVinculado)
  sugestoesDoAprovado: Sugestao[];

  @OneToMany(() => Conversa, (conversa) => conversa.aprovadoVinculado)
  conversasDoAprovado: Conversa[];

  @OneToMany(() => ErroDeAtualizacao, (erro) => erro.aprovadoVinculado)
  errosDeAtualizacao: Conversa[];

  @OneToMany(() => Notificacao,(notificacao)=> notificacao.aprovadoVinculado)
  //TODO:: inserir os nomes dos atributos no SSOT
  notificacoes: Notificacao[];


  //-------------------------------------getters/setters
  public setDataPosse( data: Date ){
    this.dataPosse = data;
  }

  public getDataPosse(): Date{
    return this.dataPosse
  }

  public getNome(): string{
    return this.nome;
  }

  public setNome(nome: string){
    this.nome = nome;
  }

  public setSituacao(situacao: valoresPadrao.Situacao){
    this.situacao = situacao;
  }

  public getSenha(): string{
    return this.senha;
  }

  public setSenha( senha: string ){
    this.senha = senha;
  }

  //------------------------------------outros metodos

  /*
  public async enviarNotificacoes(){
    this.notificacoes.forEach( async (n) => n.notificar()) 
  }
  */
}

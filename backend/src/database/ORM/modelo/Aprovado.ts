import { Contato, LotadoEm, Situacao, Turma, Ranking } from '../modelo/exporter';
import { Entity, Column, PrimaryColumn, ManyToOne, JoinColumn, OneToOne, OneToMany, } from 'typeorm'
import { atributos, entidades } from '../../../SSOT/base_de_dados//exporter';

//TODO:: inserir no arquivo de constantes
@Entity(entidades.Aprovado)
export default class Aprovado{

  @PrimaryColumn({name: atributos.Aprovado.PosicaoAmpla , type: 'smallint'})
  posicao: number;

  @Column({name: atributos.Aprovado.Nome})
  nome: string;

  @Column({name: atributos.Aprovado.Senha})
  senha: string

  @Column({name: atributos.Aprovado.Situacao})
  situacao: string

  @Column({name: atributos.Aprovado.Turma,nullable: true})
  turma?: number

  @Column()
  ppp: boolean

  @Column()
  pcd: boolean

  @Column()
  ativado: boolean

  /*-------------------------------joins------------------------------*/
  //as joins devem ter exatamente o mesmo nome das contantes de SSOT/base_de_dados/relacionamentos
  @OneToOne(() => LotadoEm, (lotadoEm) => lotadoEm.aprovadoVinculado)
  //TODO:: inserir os nomes dos atributos no SSOT
  lotadoEm: LotadoEm

  @ManyToOne(() => Situacao,(situacao)=> situacao.aprovadosNaSituacao)
  //TODO:: inserir os nomes dos atributos no SSOT
  @JoinColumn({name: atributos.Aprovado.Situacao})
  situacaoVinculada: Situacao 

  @ManyToOne(() => Turma,(turma)=> turma.aprovadosDaTurma)
  //TODO:: inserir os nomes dos atributos no SSOT
  @JoinColumn({name: atributos.Aprovado.Turma})
  turmaVinculada: Turma 

  @OneToOne(() => Contato, (contato) => contato.usuarioVinculado)
  //TODO:: inserir os nomes dos atributos no SSOT
  contatoDoAprovado: Contato

  @OneToMany(() => Ranking, (ranking) => ranking.aprovadoVinculado )
  rankingsDoAprovado: Ranking[]
}

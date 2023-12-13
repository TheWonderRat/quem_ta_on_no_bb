import { Contato, LotadoEm, Situacao, Turma, Ranking } from '../modelo/exporter';
import { Entity, Column, PrimaryColumn, ManyToMany, ManyToOne, JoinColumn, OneToOne, OneToMany, } from 'typeorm'
import { atributos, entidades } from '../../../SSOT/migracoes/exporter';

//TODO:: inserir no arquivo de constantes
@Entity(entidades.Aprovado)
export default class Aprovado{

  @PrimaryColumn({name: atributos.Aprovado.Inscricao})
  inscricao: number;

  @Column({name: atributos.Aprovado.Nome})
  nome: string;

  @Column({name: atributos.Aprovado.Senha})
  senha: string

  @Column({name: atributos.Aprovado.Situacao})
  situacao: string

  @Column()
  turma: number

  @Column()
  ativado: boolean

  /*-------------------------------joins------------------------------*/
  @OneToOne(() => LotadoEm, (lotadoEm) => lotadoEm.aprovadoVinculado)
  //TODO:: inserir os nomes dos atributos no SSOT
  lotadoEm: LotadoEm

  @ManyToOne(() => Situacao,(situacao)=> situacao.usuariosNaSituacao)
  //TODO:: inserir os nomes dos atributos no SSOT
  @JoinColumn({name: atributos.Aprovado.Situacao})
  situacaoVinculada: Situacao 

  @ManyToOne(() => Turma,(turma)=> turma.usuariosDaTurma)
  //TODO:: inserir os nomes dos atributos no SSOT
  @JoinColumn({name: atributos.Aprovado.Turma})
  turmaVinculada: Turma 

  @OneToOne(() => Contato, (contato) => contato.usuarioVinculado)
  //TODO:: inserir os nomes dos atributos no SSOT
  contato: Contato

  @OneToMany(() => Ranking, (ranking) => ranking.aprovado )
  rankingsDoAprovado: Ranking[]
}

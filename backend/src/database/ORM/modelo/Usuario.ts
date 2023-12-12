import { Entity, Column, PrimaryColumn, ManyToMany, } from 'typeorm'

//TODO:: inserir no arquivo de constantes
@Entity('aprovado')
export default class Aprovado{

  @PrimaryColumn()
  inscricao: number;

  @Column()
  nome: string;

  @Column()
  senha: string

  @Column()
  situacao: string

  @Column()
  turma: number

  @Column()
  ativado: boolean
}

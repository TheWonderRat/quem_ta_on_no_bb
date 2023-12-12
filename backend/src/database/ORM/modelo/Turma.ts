import { Entity, Column, PrimaryColumn, ManyToMany, } from 'typeorm'

//TODO:: inserir no arquivo de constantes
@Entity('turma')
export default class Turma{

  @PrimaryColumn()
  numero: number;

}


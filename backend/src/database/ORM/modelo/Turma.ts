import { Entity, PrimaryColumn, OneToMany, CreateDateColumn, UpdateDateColumn, DeleteDateColumn} from 'typeorm'
import { Aprovado } from './exporter';
import { atributos, entidades } from '../../../SSOT/base_de_dados/exporter';

//TODO:: inserir no arquivo de constantes
@Entity(entidades.Turma)
export default class Turma{

  @PrimaryColumn({name: atributos.Turma.Numero})
  numero: number;

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date

  @DeleteDateColumn()
  deletedAt: Date

  /*----------------------------------join----------------------------*/

  @OneToMany(() => Aprovado, (usuario) => usuario.turmaVinculada)
  aprovadosDaTurma: Aprovado[];
  

}


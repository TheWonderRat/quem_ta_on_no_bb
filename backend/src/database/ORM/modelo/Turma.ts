import { Entity, PrimaryColumn, OneToMany, } from 'typeorm'
import { Aprovado } from './exporter';
import { atributos, entidades } from '../../../SSOT/base_de_dados/exporter';

//TODO:: inserir no arquivo de constantes
@Entity(entidades.Turma)
export default class Turma{

  @PrimaryColumn({name: atributos.Turma.Numero})
  numero: number;

  /*----------------------------------join----------------------------*/

  @OneToMany(() => Aprovado, (usuario) => usuario.turmaVinculada)
  aprovadosDaTurma: Aprovado[];
  

}


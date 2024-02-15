import { Lotacao } from '../modelo/exporter';
import { Entity, PrimaryColumn, OneToMany, CreateDateColumn,UpdateDateColumn,DeleteDateColumn} from 'typeorm'
import { atributos, entidades } from '../../../SSOT/base_de_dados/exporter';

//TODO:: inserir no arquivo de constantes
@Entity(entidades.Diretoria)
export default class Diretoria{

  @PrimaryColumn({name: atributos.Diretoria.Nome})
  nome: string;

  @CreateDateColumn()
  criadoEm: Date

  @UpdateDateColumn()
  atualizadoEm: Date

  @DeleteDateColumn()
  excluidoEm: Date

  /*------------------------------------join--------------------------*/

  @OneToMany(() => Lotacao, (lotacao) => lotacao.diretoriaVinculada )
  lotacoesVinculadas: Lotacao[]

} 

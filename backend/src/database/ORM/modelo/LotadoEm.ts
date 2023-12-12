import { Entity, Column, PrimaryColumn, ManyToMany, ManyToOne} from 'typeorm';


//TODO:: Inserir nome no arquivo de constantes
@Entity('lotado_em')
export default class LotadoEm{

  @PrimaryColumn()
  inscricao:number 

  @Column()
  cidade: string

  @Column()
  estado: string

  @Column()
  diretoria: string

  @Column()
  unidade:number 

}

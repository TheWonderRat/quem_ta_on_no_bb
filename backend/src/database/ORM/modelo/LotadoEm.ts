import { Lotacao } from './exporter';
import { 
  Entity, 
  Column, 
  PrimaryColumn, 
  ManyToMany, 
  ManyToOne, 
  OneToOne, 
  JoinColumn, 
  CreateDateColumn, 
  UpdateDateColumn, 
  DeleteDateColumn
} from 'typeorm';
import { Aprovado } from './exporter';
import { atributos, entidades } from '../../../SSOT/base_de_dados/exporter';


//TODO:: Inserir nome no arquivo de constantes
@Entity(entidades.LotadoEm)
export default class LotadoEm{

  @PrimaryColumn({name: atributos.LotadoEm.PosicaoAmpla})
  posicao:number 

  @PrimaryColumn({name: atributos.LotadoEm.Cidade})
  cidade: string

  @PrimaryColumn({name: atributos.LotadoEm.Estado})
  estado: string

  @PrimaryColumn({name: atributos.LotadoEm.Diretoria})
  diretoria: string

  @CreateDateColumn()
  criadoEm: Date

  @UpdateDateColumn()
  atualizadoEm: Date

  @DeleteDateColumn()
  excluidoEm: Date

  /*-----------------------------join-------------------------------*/

  //@OneToOne(() => Aprovado, (aprovado) => aprovado.lotadoEm)
  //@JoinColumn({name: atributos.LotadoEm.Inscricao ,referencedColumnName: atributos.Aprovado.Inscricao})
  @OneToOne(() => Aprovado, (aprovado) => aprovado.lotadoEm)
  @JoinColumn({name: atributos.LotadoEm.PosicaoAmpla,referencedColumnName: atributos.Aprovado.PosicaoAmpla})
  aprovadoVinculado: Aprovado

  @ManyToOne(() => Lotacao, (lotacao) => lotacao.aprovadosNaLotacao ) 
  @JoinColumn([
  //TODO:: inserir o nome no arquivo de constantes
    {name: atributos.LotadoEm.Cidade,referencedColumnName: atributos.Lotacao.Cidade},
    {name: atributos.LotadoEm.Estado,referencedColumnName: atributos.Lotacao.Estado},
    {name: atributos.LotadoEm.Diretoria,referencedColumnName: atributos.Lotacao.Diretoria},
  ])
  lotacaoVinculada: Lotacao

}

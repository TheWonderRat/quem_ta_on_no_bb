import { 
  Entity, 
  Column, 
  PrimaryColumn, 
  ManyToOne, 
  JoinColumn, 
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn 
} from 'typeorm'
import Aprovado from './Aprovado';
import { atributos, entidades, valoresPadrao } from '../../../SSOT/base_de_dados/exporter';
import TipoNotificacao from './TipoNotificacao';

//TODO:: inserir no arquivo de constantes
@Entity(entidades.Notificacao)
export default class Notificacao{

  @PrimaryColumn({ name: atributos.Notificacao.Tipo })
  //  criar um enum depois?
  tipo: number;

  @PrimaryColumn({ name: atributos.Notificacao.PosicaoDoAprovado})
  posicaoDoAprovado: number

  @CreateDateColumn()
  criadoEm: Date

  @UpdateDateColumn()
  atualizadoEm: Date

  @DeleteDateColumn()
  excluidoEm: Date

  //--------------------------------join---------------------------------------
  @ManyToOne(() => TipoNotificacao,(tipo) => tipo.tipo)
  @JoinColumn({
    name: atributos.Notificacao.Tipo, 
    referencedColumnName: atributos.TipoNotificacao.Tipo
  })
  tipoNotificacao: TipoNotificacao 

  @ManyToOne(() => Aprovado,(aprovado) => aprovado.notificacoes)
  @JoinColumn({
    name: atributos.Notificacao.PosicaoDoAprovado, 
    referencedColumnName: atributos.Aprovado.PosicaoAmpla
  })
  aprovadoVinculado: Aprovado

}






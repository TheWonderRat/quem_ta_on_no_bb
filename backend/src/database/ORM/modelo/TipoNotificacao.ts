import { Notificacao } from './exporter';
import { 
  Entity, 
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn, 
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
  JoinColumn
} from 'typeorm';

import { 
  atributos, 
  entidades, 
  valoresPadrao 
} from '../../../SSOT/base_de_dados/exporter';

//TODO:: inserir no arquivo de constantes
@Entity(entidades.TipoNotificacao)
export default class TipoNotificacao{

  @PrimaryGeneratedColumn({ name: atributos.TipoNotificacao.Tipo})
  //  criar um enum depois?
  tipo: number;

  @Column({ name: atributos.TipoNotificacao.Descricao})
  //  criar um enum depois?
  descricao: string;

  @CreateDateColumn()
  criadoEm: Date

  @UpdateDateColumn()
  atualizadoEm: Date

  @DeleteDateColumn()
  excluidoEm: Date

  //--------------------------------join---------------------------------------

  @OneToMany(() => Notificacao, (notificacao) => notificacao.tipoNotificacao )
  notificacoes: Notificacao[]
}


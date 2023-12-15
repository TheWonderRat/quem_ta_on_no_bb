
import { 
  Cidade, 
  Contato, 
  Diretoria, 
  Estado, 
  Lotacao, 
  LotadoEm, 
  Ranking, 
  Situacao, 
  TipoRanking, 
  Turma, 
  Aprovado 
} from '../ORM/modelo/exporter';

import { DataSource } from 'typeorm';
import { 
  BD_HOST_PADRAO, 
  BD_PORTA_PADRAO, 
  BD_BASE_PADRAO, 
  BD_SENHA_PADRAO, 
  BD_USUARIO_PADRAO,
} from '../../SSOT/base_de_dados/configuracao'; 

const dataSource = new DataSource({
  //TODO:: criar tipo para os tipos de base de dados
  type: 'postgres',
  host: process.env.DB_HOST,
  port: BD_PORTA_PADRAO,
  username: BD_USUARIO_PADRAO,
  password: BD_SENHA_PADRAO,
  database: BD_BASE_PADRAO,
  synchronize: true,
  entities: [
    Cidade, 
    Contato, 
    Diretoria, 
    Estado, 
    Lotacao, 
    LotadoEm, 
    Ranking, 
    Situacao, 
    TipoRanking, 
    Turma, 
    Aprovado 
  ],
  migrations: [
    '../ORM/modelo/*.ts'
  ]
})

dataSource.initialize()
  .then((e) =>{
    console.log("Devidamente chamado!")
  })


export default dataSource;

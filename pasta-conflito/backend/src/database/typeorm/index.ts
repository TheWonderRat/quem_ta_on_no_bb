import { DataSource } from "typeorm"
import { Aprovado } from '../../modules/Aprovado/entity/Aprovado'
import { Lista } from '../../modules/Lista/entity/Lista'
import { Situacao } from '../../modules/Situacao/entity/Situacao'
import { TipoLista } from '../../modules/TipoLista/entity/TipoLista';
import { Lotacao } from '../../modules/Lotacao/entity/Lotacao'
import { Turma } from '../../modules/Turma/entity/Turma'
import { Cidade } from '../../modules/Cidade/entity/Cidade'
import { Diretoria } from '../../modules/Diretoria/entity/Diretoria;
import { LotadoEm } from "@modules/LotadoEm/entity/LotadoEm";


export const myDataSource = new DataSource({
  type:"postgres",
  host:"localhost",
  port:5432,
  username:"postgres",
  password:"docker",
  database:"aprovados_bb",
  synchronize: true,
  //NAO MUDAR
  entities:[
    "./src/modules/**/entity/*.ts"
  ],
  //NAO MUDAR
  migrations:[
    "./src/shared/typeorm/migrations/*.ts"
  ]
});


myDataSource.initialize()
  .then(async () => {
    //run migrations with e
    //insert data with e
    //kill database with e await runAfterInit();
    console.log("initialized properly")
  })
  .catch((e) =>{
    console.log(`${e}`)
  })
  .finally(async () => {
    await runAfterInit();
    console.log("called after database connection")
  });

async function runAfterInit(){
}

import { DataSource } from "typeorm"
import { Aprovado } from '../../modules/Aprovado/entity/Aprovado'
import { Lista } from '../../modules/Lista/entity/Lista'
import { Situacao } from '../../modules/Situacao/entity/Situacao'
import { TipoLista } from '../../modules/TipoLista/entity/TipoLista';
import { Lotacao } from '../../modules/Lotacao/entity/Lotacao'
import { Turma } from '../../modules/Turma/entity/Turma'


export const myDataSource = new DataSource({
  "type":"postgres",
  "host":"localhost",
  "port":5432,
  "username":"postgres",
  "password":"docker",
  "database":"aprovados_novo",
  //"synchronize": true,
  "entities":[
    //'../../modules/**/entity/*.ts'
    Aprovado,
    Lista,
    Situacao,
    TipoLista,
    Lotacao,
    Turma,
    /*
    '../../modules/Aprovado/entity/Aprovado',
    '../../modules/Lista/entity/Lista',
    '../../modules/Situacao/entity/Situacao',
    '../../modules/Lotacao/entity/Lotacao',
    "../../TipoLista/entity/TipoLista",
    '../../modules/User/entity/UserEntity'
    */
  ],
  "migrations":[
    //'./migrations/*.ts',
    '../../modules/Aprovado/entity/Aprovado',
    '../../modules/Lista/entity/Lista',
    '../../modules/Situacao/entity/Situacao',
    '../../modules/Lotacao/entity/Lotacao',
    "../../TipoLista/entity/TipoLista",
    '../../modules/User/entity/UserEntity'
    /*
    './migrations/1699291082639-CreateTurma.ts',
    './migrations/1699293347264-CreateLista.ts',
    './migrations/1699291030243-CreateLotacao.ts',
    './migrations/1699291074688-CreateSituacao.ts',
    './migrations/1699291092575-CreateTipoLista.ts',
    './migrations/1698767828418-CreateAprovado.ts'
    */
    //'../../modules/**/entity/**',
  ]
});


myDataSource.initialize()
  .then((e) => {
    /*
    const jsonStringOne = require('../../../dados_dos_candidatos/src/diretas.json');
    const jsonStringTwo = require('../../../dados_dos_candidatos/src/cadastroReserva.json');
  
    jsonStringOne.forEach(async (u: User)=>{
      const user = myDataSource.manager.create(User);
      user.inscricao = u.inscricao;
      user.nome = u.nome,
      user.senha = u.senha;
      user.dataPosse = u.dataPosse;
      user.cidadePosse = u.cidadePosse;
      user.lotacao = u.lotacao;
      user.dataQuestionario = u.dataQuestionario;
      user.turma = u.turma;
      user.posicaoAmpla = u.posicaoAmpla;
      user.posicaoPPP = u.posicaoPPP;
      user.posicaoPCD = u.posicaoPCD;

      await myDataSource.manager.save(user);
    });

    jsonStringTwo.forEach(async (u: User)=>{
      const user = myDataSource.manager.create(User);
      user.inscricao = u.inscricao;
      user.nome = u.nome,
      user.senha = u.senha;
      user.dataPosse = u.dataPosse;
      user.cidadePosse = u.cidadePosse;
      user.lotacao = u.lotacao;
      user.dataQuestionario = u.dataQuestionario;
      user.turma = u.turma;
      user.posicaoAmpla = u.posicaoAmpla;
      user.posicaoPPP = u.posicaoPPP;
      user.posicaoPCD = u.posicaoPCD;

      await myDataSource.manager.save(user);
    });
      */

    console.log("data source has been initialized!")
  })
  .catch((e) =>{
    console.log(`${e}`)
  })



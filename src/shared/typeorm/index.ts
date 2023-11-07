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
    /*
    Aprovado,
    Lista,
    Situacao,
    TipoLista,
    Lotacao,
    Turma,
    */
    '../../modules/Aprovado/entity/Aprovado',
    '../../modules/Lista/entity/Lista',
    '../../modules/Situacao/entity/Situacao',
    '../../modules/Lotacao/entity/Lotacao',
    "../../TipoLista/entity/TipoLista",
    '../../modules/User/entity/UserEntity'
  ],
  "migrations":[

    '../../modules/**/entity/*.ts'
    /*
    '../../modules/Aprovado/entity/Aprovado',
    '../../modules/Lista/entity/Lista',
    '../../modules/Situacao/entity/Situacao',
    '../../modules/Lotacao/entity/Lotacao',
    "../../TipoLista/entity/TipoLista",
    "../../Turma/entity/Turma"
    */
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



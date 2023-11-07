"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.myDataSource = void 0;
const typeorm_1 = require("typeorm");
//import { User } from '@modules/User/entity/UserEntity'
//import { User } from '../../modules/User/entity/UserEntity'
const UserEntity_1 = require("../../modules/User/entity/UserEntity");
exports.myDataSource = new typeorm_1.DataSource({
    "type": "postgres",
    "host": "localhost",
    "port": 5432,
    "username": "postgres",
    "password": "docker",
    "database": "aprovados",
    "synchronize": true,
    "entities": [
        UserEntity_1.User
        //'../../modules/User/entity/UserEntity'
    ],
    "migrations": [
        '../../modules/User/entity/UserEntity'
    ]
});
exports.myDataSource.initialize()
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
    console.log("data source has been initialized!");
})
    .catch((e) => {
    console.log(`${e}`);
});

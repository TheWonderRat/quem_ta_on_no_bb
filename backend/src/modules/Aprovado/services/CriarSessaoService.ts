import AppError, { AppErrorType } from '@shared/errors/AppError';
import { compare } from 'bcryptjs';

import authConfig from '@config/auth';
// import { UserRepository } from '../entity/UserRepository'
import { myDataSource } from '@shared/typeorm/index';
import jwt from 'jsonwebtoken';
import { Aprovado } from '../entity/Aprovado';
// import { Aprovado } from '@modules/Aprovado/entity/Aprovado';
import AprovadosDBConstants from '../constants/AprovadosDBConstants';

// const jsonwebtoken = require ('jsonwebtoken');

interface IRequest {
  login:string;
  senha:string;
}

interface IResponse {
  token:string,
  message: string
}

class CriarSessaoService {
  // not sure if I should use any here...
  // TODO:: later I should return, or a class of user, or an instance of AppError
  public async execute({ login, senha }: IRequest): Promise<IResponse | AppError> {
    const usuario = await myDataSource
      .getRepository(Aprovado)
      .createQueryBuilder('apr')
      .where(`apr.${AprovadosDBConstants.Inscricao} = :login`, { login })
      .getOne();

    if (!usuario) {
      return new AppError(AppErrorType.UserNotFound);
    }

    const hashedPswd = await compare(senha, usuario.senha);

    if (!hashedPswd) {
      return new AppError(AppErrorType.MissmatchedPassword);
    }

    // TODO:: sobrescrever os tipos do typescript para suportar o retorno do token
    const token = jwt.sign(
      { usuario: usuario.inscricao },
      authConfig.jwt.secret,
      { subject: usuario.inscricao.toString(), expiresIn: authConfig.jwt.expiresIn },
    );

    return { token, message: `sessao de ${usuario.nome} criada com sucesso!` };
  }
}

export default CriarSessaoService;

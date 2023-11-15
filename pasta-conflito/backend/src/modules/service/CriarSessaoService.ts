// libraries
import { compare } from 'bcryptjs';
import jwt from 'jsonwebtoken';

// SSOT
import AprovadosDBConstants from '../../SSOT/AprovadosDBConstants';
import { errorMessages, httpStatus } from '../../SSOT/exporter';

// utils
import AppError from '../../shared/utils/error/errorConstructor';

// ORM
import myDataSource from '../../database/typeorm';
import { Aprovado } from '../entity/Aprovado';

// Environment variables
const JWT_SECRET = process.env.JWT_SECRET || 'default';
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '1d';

type Request = {
  login:string;
  senha:string;
};

type Response = {
  token:string,
  message: string
};

class CriarSessaoService {
  // not sure if I should use any here...
  // TODO:: later I should return, or a class of user, or an instance of AppError
  public static async execute({ login, senha }: Request): Promise<Response> {
    const usuario = await myDataSource
      .getRepository(Aprovado)
      .createQueryBuilder('apr')
      .where(`apr.${AprovadosDBConstants.inscricao} = :login`, { login })
      .getOne();

    if (!usuario) {
      throw new AppError(errorMessages.USER_NOT_FOUND, httpStatus.HttpStatusNotFound);
    }

    const hashedPswd = await compare(senha, usuario.senha);

    if (!hashedPswd) {
      throw new AppError(errorMessages.MISS_MATCHED_PASSWORD, httpStatus.HttpStatusUnauthorized);
    }

    // TODO:: sobrescrever os tipos do typescript para suportar o retorno do token
    const token = jwt.sign(
      { usuario: usuario.inscricao },
      JWT_SECRET,
      { subject: usuario.inscricao.toString(), expiresIn: JWT_EXPIRES_IN },
    );

    return { token, message: `sessao de ${usuario.nome} criada com sucesso!` };
  }
}

export default CriarSessaoService;

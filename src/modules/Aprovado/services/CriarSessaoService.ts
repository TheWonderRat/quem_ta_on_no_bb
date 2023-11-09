import { compare } from 'bcryptjs';
import jsonwebtoken from 'jsonwebtoken';

import authConfig from '../../../config/auth.json';
import myDataSource from '../../../shared/typeorm';
import AppError from '../../../shared/errors/AppError';
import Aprovado from '../entity/Aprovado';

type Request = {
  login: string;
  senha: string;
};

type Response = {
  token: string,
  message: string
};

class CriarSessaoService {
  private readonly tableName = 'usuario';
  // not sure if I should use any here...
  // TODO:: later I should return, or a class of user, or an instance of AppError
  public async execute({ login, senha }: Request): Promise<Response | AppError> {
    const usuario = await myDataSource
      .getRepository(Aprovado)
      .createQueryBuilder(this.tableName)
      .where('usuario.inscricao = :login', { login })
      .getOne();

    if (!usuario) {
      return new AppError('Usuario nao foi encontrado!', 401);
    }

    const hashedPswd = await compare(senha, usuario.senha);

    if (!hashedPswd) {
      return new AppError('Combicanao usuario/senha nao confere!', 401);
    }

    // TODO:: sobrescrever os tipos do typescript para suportar o retorno do token
    const token = await jsonwebtoken.sign(
      {
        usuario: usuario.inscricao,
      },
      authConfig.jwt.secret,
      {
        subject: usuario.inscricao.toString(),
        expiresIn: authConfig.jwt.expiresIn,
      },
    );

    return { token, message: `sessao de ${usuario.nome} criada com sucesso!` };
  }
}

export default CriarSessaoService;

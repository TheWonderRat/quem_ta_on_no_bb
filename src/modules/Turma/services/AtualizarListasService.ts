import { compare } from 'bcryptjs';

import myDataSource from '../../../shared/typeorm';
import AppError from '../../../shared/errors/AppError';
import Aprovado from '../../Aprovado/entity/Aprovado';

type Request = {
  login:string;
  senha:string;
};

type Response = {
  token:string;
};

class AtualizarListasService {
  private readonly startMessage = 'atualizar listas service';
  // not sure if I should use any here...
  // TODO:: later I should return, or a class of user, or an instance of AppError
  public async execute({ login, senha }: Request): Promise<Response | AppError> {
    console.log(this.startMessage);
    const usuario = await myDataSource
      .manager
      .getRepository(Aprovado)
      .createQueryBuilder()
      .where('inscricao = :login', { login })
      .getOne();

    if (!usuario) {
      return new AppError('Usuario nao foi encontrado!', 401);
    }

    const hashedPswd = await compare(senha, usuario.senha);

    if (!hashedPswd) {
      return new AppError('Combicanao usuario/senha nao confere!', 401);
    }

    return {
      token: 'Atualizar Listas chamado com sucesso, embora ainda nao tenha sido implementado!',
    };
  }
}

export default AtualizarListasService;

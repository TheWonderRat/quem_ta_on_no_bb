import { hash, compare } from 'bcryptjs';

import AppError from '../../../shared/errors/AppError';
import myDataSource from '../../../shared/typeorm';
import Aprovado from '../../Aprovado/entity/Aprovado';

type Request = {
  login: string
  senha:string,
  novaSenha: string
};

type Response = {
  token: string
};

class AtualizarSenhaService {
  private readonly tableName: string = 'usuario';
  // not sure if I should use any here...
  // TODO:: later I should return, or a class of user, or an instance of AppError
  public async execute({ login, senha, novaSenha }: Request): Promise<Response | AppError> {
    const usuario = await myDataSource
      .getRepository(Aprovado)
      .createQueryBuilder(this.tableName)
      .where('usuario.inscricao = :login', { login })
      .getOne();

    if (!usuario) {
      return new AppError('Usuario nao encontrado', 401);
    }

    const hashedPassword = await compare(senha, usuario.senha);

    if (!hashedPassword) {
      return new AppError('Combinacao usuario/senha nao confere!', 401);
    }

    // TODO:: Colocar o salt em uma nova constante
    const newPswd = await hash(novaSenha, 8);

    await myDataSource
      .createQueryBuilder()
      .update(Aprovado)
      .set({ senha: newPswd })
      .where('inscricao = :login', { login })
      .execute();

    return { token: `Senha de ${usuario.nome} atualizada com sucesso!` };
  }
}

export default AtualizarSenhaService;

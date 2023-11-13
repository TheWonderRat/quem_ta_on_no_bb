import AppError, { AppErrorType } from '@shared/errors/AppError';
import { hash, compare } from 'bcryptjs';
import { AprovadosRepo } from '../repository/AprovadoRepository';

interface IRequest {
  login: number,
  senha:string,
  novaSenha: string
}

interface IResponse {
  token: string
}

class AtivarContaService {
  // not sure if I should use any here...
  // TODO:: later I should return, or a class of user, or an instance of AppError
  public async execute({ login, senha, novaSenha }: IRequest): Promise<IResponse | AppError> {
    const usuario = await AprovadosRepo.findByLogin(login);

    if (!usuario) {
      return new AppError(AppErrorType.UserNotFound);
    }

    const hashedPassword = await compare(senha, usuario.senha);

    if (!hashedPassword) {
      return new AppError(AppErrorType.MissmatchedPassword);
    }

    // TODO:: Colocar o salt em uma nova constante
    const newPswd = await hash(novaSenha, 8);

    await AprovadosRepo.updatePassword(login, newPswd);

    return { token: `conta de ${usuario.nome} Ativado com sucesso!` };
  }
}

export default AtivarContaService;

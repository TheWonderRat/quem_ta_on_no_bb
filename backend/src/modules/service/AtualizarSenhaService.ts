// // libraries
// import { hash, compare } from 'bcryptjs';

// // SSOT
// import { errorMessages, httpStatus } from '../../SSOT/exporter';

// // utils
// import AppError from '../../shared/utils/error/errorConstructor';

// // repositories
// import { AprovadosRepository } from '../repository/exporter';

// type Request = {
//   login: number,
//   senha:string,
//   novaSenha: string
// };

// type Response = {
//   token: string
// };

// class AtualizarSenhaService {
//   // not sure if I should use any here...
//   // TODO:: later I should return, or a class of user, or an instance of AppError
//   public static async execute({ login, senha, novaSenha }: Request): Promise<Response> {
//     const aprovado = await AprovadosRepository.findByLogin(login);

//     if (!aprovado) {
//       throw new AppError(errorMessages.USER_NOT_FOUND, httpStatus.HttpStatusNotFound);
//     }

//     const hashedPassword = await compare(senha, aprovado.senha);

//     if (!hashedPassword) {
//       throw new AppError(errorMessages.MISS_MATCHED_PASSWORD, httpStatus.HttpStatusUnauthorized);
//     }

//     // TODO:: Colocar o salt em uma nova constante
//     const newPswd = await hash(novaSenha, 8);

//     await AprovadosRepository.updatePassword(login, newPswd);

//     return { token: `Senha de ${aprovado.nome} atualizada com sucesso!` };
//   }
// }

// export default AtualizarSenhaService;

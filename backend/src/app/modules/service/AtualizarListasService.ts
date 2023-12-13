// // libraries
// import { compare } from 'bcryptjs';

// // SSOT
// import { errorMessages, httpStatus } from '../../SSOT/exporter';

// // utils
// import AppError from '../../shared/utils/error/errorConstructor';

// // repositories
// import { AprovadosRepository } from '../repository/exporter';

// type Request = {
//   login:number;
//   senha:string;
// };

// type Response = {
//   token:string;
// };

// class AtualizarListasService {
//   // not sure if I should use any here...
//   // TODO:: later I should return, or a class of user, or an instance of AppError
//   public static async execute({ login, senha }: Request): Promise<Response> {
//     const aprovado = await AprovadosRepository.findByLogin(login);

//     if (!aprovado) {
//       throw new AppError(errorMessages.USER_NOT_FOUND, httpStatus.HttpStatusNotFound);
//     }

//     const hashedPswd = await compare(senha, aprovado.senha);

//     if (!hashedPswd) {
//       throw new AppError(errorMessages.MISS_MATCHED_PASSWORD, httpStatus.HttpStatusUnauthorized);
//     }

//     return {
//       token: 'Atualizar Listas chamado com sucesso, embora ainda nao tenha sido implementado!',
//     };
//   }
// }

// export default AtualizarListasService;

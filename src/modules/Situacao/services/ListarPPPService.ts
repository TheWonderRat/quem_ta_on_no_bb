import AppError from '@shared/errors/AppError';
import { myDataSource } from '@shared/typeorm/index';
import { Aprovado } from '../entity/Aprovado';

interface IRequest {
  pagina:number,
  candidatos: number,
}

interface IResponse {
  aprovados: Aprovado[],
  message: string
}

class ListarPPPService {
  // not sure if I should use any here...
  // TODO:: later I should return, or a class of user, or an instance of AppError
  // TODO:: filter the user info that can be shown(exclude password, for exampl)
  public async execute({ candidatos, pagina }: IRequest): Promise<IResponse | AppError> {
    const aprovados = await myDataSource
      .getRepository(Aprovado)
      .createQueryBuilder('usuario')
      .select()
      .where('usuario.posicaoPPP IS NOT NULL')
      // .skip(candidatos)
      .skip(candidatos * pagina)
      .take(candidatos)
      .orderBy('usuario.posicaoPPP', 'ASC')
      // .take(candidatos)
      .execute();

    // TODO:: adicionar autenticacao

    // adicionar paginacao
    /*
    const aprovados = await myDataSource
      .manager
      .getRepository(User)
      .createQueryBuilder()
      .where("posicaoPPP  != null")
      .skip(candidatos * pagina)
      .take(candidatos)
      .execute();
    */
    // const user = await UserModel.find()

    // return user
    return { aprovados, message: 'listas PPP chamado com sucesso' };
  }
}

export default ListarPPPService;

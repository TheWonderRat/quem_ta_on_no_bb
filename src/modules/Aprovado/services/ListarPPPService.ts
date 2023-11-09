import myDataSource from '../../../shared/typeorm';
import AppError from '../../../shared/errors/AppError';
import Aprovado from '../entity/Aprovado';

type Request = {
  pagina:number,
  candidatos: number,
};

type Response = {
  aprovados: Aprovado[],
  message: string
};

class ListarPPPService {
  private readonly tableName = 'usuario';
  // not sure if I should use any here...
  // TODO:: later I should return, or a class of user, or an instance of AppError
  // TODO:: filter the user info that can be shown(exclude password, for exampl)
  public async execute({ candidatos, pagina }: Request): Promise<Response | AppError> {
    const aprovados = await myDataSource
      .getRepository(Aprovado)
      .createQueryBuilder(this.tableName)
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

import AppError from '../../../shared/errors/AppError';
import myDataSource from '../../../shared/typeorm';
import Aprovado from '../../Aprovado/entity/Aprovado';

type Request = {
  pagina: number,
  candidatos: number,
};
type Response = {
  aprovados: Aprovado[],
  message: string
};

class ListarTresParaUmService {
  private readonly tableName: string = 'usuario';
  // not sure if I should use any here...
  // TODO:: later I should return, or a class of user, or an instance of AppError
  // TODO:: filter the user info that can be shown(exclude password, for example)
  public async execute({ candidatos, pagina }: Request): Promise<Response | AppError> {
    const aprovados = await myDataSource
      .getRepository(Aprovado)
      .createQueryBuilder(this.tableName)
      .select()
      .skip(candidatos * pagina)
      .take(candidatos)
      .orderBy('usuario.posicaoAmpla', 'ASC')
      .execute();

    // TODO:: Create view aggregating PCD results
    /*
  const aprovadosAmpla = await myDataSource
      .getRepository(User)
      .createQueryBuilder("usuario")
      .select()
      .skip(candidatos * pagina)
      .take(candidatos)
      .orderBy("usuario.posicaoAmpla","ASC")
      .execute();
    */

    // adicionar paginacao

    return { aprovados, message: 'Nao implementato ainda, os resultados sao os da ampla!!' };
  }
}

export default ListarTresParaUmService;

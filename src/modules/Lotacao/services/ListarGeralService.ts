import AppError from '@shared/errors/AppError'
import { Aprovado } from '../entity/Aprovado'
import { myDataSource } from '@shared/typeorm/index';

interface IRequest{
  pagina: number,
  candidatos: number,
}
interface IResponse{
  aprovados: Aprovado[],
  message: string
}

class ListarGeralService{
	//not sure if I should use any here...
	//TODO:: later I should return, or a class of user, or an instance of AppError 
	//TODO:: filter the user info that can be shown(exclude password, for exampl)
	public async execute({candidatos, pagina}: IRequest): Promise<IResponse| AppError>{


    const aprovados = await myDataSource
      .getRepository(Aprovado)
      .createQueryBuilder("usuario")
      .select()
      //.skip(candidatos)
      //.take(candidatos * pagina)
      .skip(candidatos * pagina)
      .take(candidatos)
      .orderBy("usuario.posicaoAmpla","ASC")
      .execute();

    //adicionar paginacao
    /*
    const aprovados = await myDataSource
      .manager 
      .getRepository(User)
      .createQueryBuilder()
      .where("posicaoPPP != null")
      .skip(candidatos * pagina)
      .take(candidatos)
      .execute();
    */
		//const user = await UserModel.find()
		
		//return user
    return { aprovados, message: "listas PCD chamado com sucesso"}
	}
}

export default ListarGeralService;


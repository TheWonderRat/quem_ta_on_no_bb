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

class ListarPCDService{
	//not sure if I should use any here...
	//TODO:: later I should return, or a class of user, or an instance of AppError 
	//TODO:: filter the user info that can be shown(exclude password, for exampl)
	public async execute({candidatos, pagina}: IRequest): Promise<IResponse| AppError>{

    const aprovados = await myDataSource
      .getRepository(Aprovado)
      .createQueryBuilder("usuario")
      .select()
      .where("usuario.posicaoPCD IS NOT NULL")
      //.skip(candidatos)
      //.take(candidatos * pagina)
      .skip(candidatos * pagina)
      .take(candidatos)
      .orderBy("usuario.posicaoPCD","ASC")
      .execute();

		//return user
    return { aprovados,message: "listas PCD chamado com sucesso"}
	}
}

export default ListarPCDService;


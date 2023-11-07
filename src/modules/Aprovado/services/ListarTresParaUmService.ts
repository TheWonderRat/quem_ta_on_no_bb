import AppError from '@shared/errors/AppError'
//import { Aprovado } from '../entity/Aprovado'
import { Aprovado } from '@modules/Aprovado/entity/Aprovado';
import { myDataSource } from '@shared/typeorm/index';

interface IRequest{
  pagina: number,
  candidatos: number,
}
interface IResponse{
  aprovados: Aprovado[],
  message: string
}

class ListarTresParaUmService{
	//not sure if I should use any here...
	//TODO:: later I should return, or a class of user, or an instance of AppError 
	//TODO:: filter the user info that can be shown(exclude password, for example)
	public async execute({candidatos, pagina}: IRequest): Promise<IResponse| AppError>{

    const aprovados = await myDataSource
      .getRepository(Aprovado)
      .createQueryBuilder("usuario")
      .select()
      .skip(candidatos * pagina)
      .take(candidatos)
      .orderBy("usuario.posicaoAmpla","ASC")
      .execute();

    //TODO:: Create view aggregating PCD results 
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



    //adicionar paginacao
		
    return { aprovados, message: "Nao implementato ainda, os resultados sao os da ampla!!"}
	}
}

export default ListarTresParaUmService;


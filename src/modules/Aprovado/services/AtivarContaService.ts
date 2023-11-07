import AppError from '@shared/errors/AppError'
import {hash, compare} from 'bcryptjs'
import { myDataSource } from "@shared/typeorm/index"
//import { Aprovado } from "../entity/Aprovado"
import { Aprovado } from "@modules/Aprovado/entity/Aprovado";

interface IRequest {
  login: number, 
  senha:string,
  novaSenha: string
}

interface IResponse{
  token: string
}

class AtivarContaService{
	//not sure if I should use any here...
	//TODO:: later I should return, or a class of user, or an instance of AppError 
	public async execute({login, senha,novaSenha}: IRequest): Promise<IResponse| AppError>{

    const usuario = await myDataSource
      .getRepository(Aprovado)
      .createQueryBuilder("usuario")
      .where("usuario.inscricao = :login", { login })
      .getOne();
    
    if (!usuario){
      return new AppError("Usuario nao encontrado",401);
    }

    const hashedPassword = await compare(senha, usuario.senha)

    if(!hashedPassword){
      return new AppError("Combinacao usuario/senha nao confere!",401);
    }

    //TODO:: Colocar o salt em uma nova constante
    const newPswd = await hash(novaSenha,8);

    await myDataSource
      .createQueryBuilder()
      .update(Aprovado)
      .set({senha: newPswd})
      .where("inscricao = :login", { login })
      .execute();

    return { token : `conta de ${usuario.nome} Ativado com sucesso!`}

	}
}

export default AtivarContaService;


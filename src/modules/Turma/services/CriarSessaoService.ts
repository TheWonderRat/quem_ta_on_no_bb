import AppError from '@shared/errors/AppError'
import {compare} from 'bcryptjs'


import authConfig from '@config/auth'
//import { UserRepository } from '../entity/UserRepository'
import { Aprovado } from '../entity/Aprovado'
import { myDataSource } from '@shared/typeorm/index'


const jsonwebtoken = require ('jsonwebtoken');

interface IRequest {
	login:string;
	senha:string;
}

interface IResponse{
	token:string,
  message: string
}

class CriarSessaoService{
	//not sure if I should use any here...
	//TODO:: later I should return, or a class of user, or an instance of AppError 
	public async execute({login, senha}: IRequest): Promise<IResponse| AppError>{

    const usuario = await myDataSource
      .getRepository(Aprovado)
      .createQueryBuilder("usuario")
      .where("usuario.inscricao = :login", { login })
      .getOne();

    if(!usuario){
			return new AppError("Usuario nao foi encontrado!",401)
    }

		const hashedPswd = await compare(senha,usuario.senha)

		if(!hashedPswd){
			return new AppError("Combicanao usuario/senha nao confere!",401)
		}

    //TODO:: sobrescrever os tipos do typescript para suportar o retorno do token
    const token = await jsonwebtoken.sign(
			{
				usuario: usuario.inscricao,
			},
			authConfig.jwt.secret,
			{
				subject: usuario.inscricao,
				expiresIn:authConfig.jwt.expiresIn,
			},
		)

    return {  token, message: `sessao de ${usuario.nome} criada com sucesso!`}
  }
}

export default CriarSessaoService;


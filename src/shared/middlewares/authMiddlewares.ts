import {NextFunction, Request, Response} from 'express'
//import {Jwt, JwtPayload,SignOptions,decode,verify, sign} from 'jsonwebtoken'
import AppError from '@shared/errors/AppError'
import authConfig from '@config/auth'
//Avoiding import error
const jsonwebtoken = require('jsonwebtoken');

const {verify} = jsonwebtoken;

interface TokenPayload{
  iat: string,
  exp: number,
  sub: string
};


export async function isAuthenticated(
	request: Request,
	response: Response,
	next:NextFunction
): Promise<void | AppError>{
	const authHeader = request.headers.authorization


	if(!authHeader){
		return new AppError("User is not authenticated!");
	}

	try{
    //TODO:: refresh token?
	  const [,token] = authHeader.split(' ');
		const decodedToken = await verify( token, authConfig.jwt.secret, {complete: true})
		return next();
	} catch(error){
		return next(new AppError("User is not authenticated"));
	}
}



import { NextFunction, Request, Response } from 'express';
import AppError from '../erros/AppError';
import { codigoErroHTTP } from '../../SSOT/exporter';



export class GerenciadorDeErros{
  public async gerenciar(
    error: Error,
    __request: Request, 
    response: Response, 
    __next: NextFunction
  ){

    if(error instanceof AppError){
        return response.status(error.codigo).json(error)
      }

      return response.status(codigoErroHTTP.ErroGenerico.ErroNoServidor).json(error)
  }
} 

export default new GerenciadorDeErros();

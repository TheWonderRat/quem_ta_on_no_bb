// library imports
//
import { NextFunction, Request, Response } from 'express';
import AppError from "../../compartilhados/erros/AppError";
import { codigoErroHTTP, mensagemErroHTTP } from "../../SSOT/exporter";




export async function errorMiddleWare(error: Error, request: Request, response: Response, next: NextFunction){
  if(error instanceof AppError){
    return response.status(error.codigo).json(error)
  }

  return response.status(codigoErroHTTP.ErroGenerico.ErroNoServidor).json(error)
}

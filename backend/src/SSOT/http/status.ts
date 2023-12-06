import { httpStatus } from '../../types/exporter';

// Success status
export const OK: httpStatus.HttpStatusOk = 200;
export const Created: httpStatus.HttpStatusCreated = 201;

export enum SuccessStatus{
  Ok = 200,
  Created = 201
}

export enum ErrorStatus{
  NotFound = 404,
  BadRequest = 400,
  Unauthorized = 401,
  ServerError = 500
}

// Error status
export const NotFound: httpStatus.HttpStatusNotFound = 404;
export const BadRequest: httpStatus.HttpStatusBadRequest = 400;
export const Unauthorized: httpStatus.HttpStatusUnauthorized = 401;
export const InternalServerError: httpStatus.HttpStatusInternalServerError = 500;

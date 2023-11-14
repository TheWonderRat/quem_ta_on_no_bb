import * as HttpStatus from '../status/httpStatus';
import * as Messages from './messages';

type AppError<T, S> = {
  message: T,
  statusCode: S
};

export type AppErrorGeneric = AppError<string, HttpStatus.HttpStatusError>;

export type UserNotFound = AppError<Messages.USER_NOT_FOUND, HttpStatus.HttpStatusNotFound>;

export type DataBaseNotFound = AppError<Messages.DATABASE_NOT_FOUND, HttpStatus.HttpStatusNotFound>;

export type MissingToken = AppError<Messages.MISSING_TOKEN, HttpStatus.HttpStatusBadRequest>;

export type UserNotAuthenticated = AppError<
Messages.USER_NOT_AUTHENTICATED,
HttpStatus.HttpStatusUnauthorized
>;

export type MissmatchedPassword = AppError<
Messages.MISS_MATCHED_PASSWORD,
HttpStatus.HttpStatusUnauthorized
>;

export type ServerSideError = AppError<
Messages.SERVER_SIDE_ERROR,
HttpStatus.HttpStatusInternalServerError
>;

export type AppErrorTypes = AppErrorGeneric
| UserNotFound
| DataBaseNotFound
| MissingToken
| UserNotAuthenticated
| MissmatchedPassword
| ServerSideError;

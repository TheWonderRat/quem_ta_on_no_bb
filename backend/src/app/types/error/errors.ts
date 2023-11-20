import * as HttpStatus from '../status/httpStatus';
import * as Messages from './messages';

type AppError<T, S> = {
  message: T,
  statusCode: S
};

export type AppErrorGeneric = AppError<string, HttpStatus.Error>;

// Tipos de error para autenticação
type UserNotFound = AppError<Messages.USER_NOT_FOUND, HttpStatus.NotFound>;
type InvalidToken = AppError<Messages.INVALID_TOKEN, HttpStatus.Unauthorized>;
type UserNotAuthenticated = AppError<Messages.USER_NOT_AUTHENTICATED, HttpStatus.Unauthorized>;

type MissMatchedPassword = AppError<Messages.MISS_MATCHED_PASSWORD, HttpStatus.Unauthorized>;

export type AuthErrorTypes = UserNotFound
| InvalidToken
| UserNotAuthenticated
| MissMatchedPassword;

// Tipos de error para requisição
type InvalidPpp = AppError<Messages.INVALID_PPP, HttpStatus.BadRequest>;
type InvalidPcd = AppError<Messages.INVALID_PCD, HttpStatus.BadRequest>;
type InvalidEmail = AppError<Messages.INVALID_EMAIL, HttpStatus.BadRequest>;
type MissingToken = AppError<Messages.MISSING_TOKEN, HttpStatus.BadRequest>;
type InvalidRegistry = AppError<Messages.INVALID_REGISTRY, HttpStatus.BadRequest>;
type MissingFieldLogin = AppError<Messages.MISSING_FIELD_LOGIN, HttpStatus.BadRequest>;
type MissingFieldRegister = AppError<Messages.MISSING_FIELD_REGISTER, HttpStatus.BadRequest>;

export type RequestErrorTypes = InvalidPpp
| InvalidPcd
| InvalidEmail
| MissingToken
| InvalidRegistry
| MissingFieldLogin
| MissingFieldRegister;

// Tipos de error para servidor
type DataBaseNotFound = AppError<Messages.DATABASE_NOT_FOUND, HttpStatus.NotFound>;

type ServerSideError = AppError<
Messages.SERVER_SIDE_ERROR,
HttpStatus.InternalServerError
>;

export type ServerErrorTypes = DataBaseNotFound | ServerSideError;

export type ErrorTypes = AuthErrorTypes | RequestErrorTypes | ServerErrorTypes;

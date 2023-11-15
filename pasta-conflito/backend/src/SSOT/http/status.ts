import { httpStatus } from '../../types/exporter';

// Success status
export const HttpStatusOk: httpStatus.HttpStatusOk = 200;
export const HttpStatusCreated: httpStatus.HttpStatusCreated = 201;

// Error status
export const HttpStatusBadRequest: httpStatus.HttpStatusBadRequest = 400;
export const HttpStatusUnauthorized: httpStatus.HttpStatusUnauthorized = 401;
export const HttpStatusNotFound: httpStatus.HttpStatusNotFound = 404;
export const HttpStatusInternalServerError: httpStatus.HttpStatusInternalServerError = 500;

import { httpStatus } from '../../types/exporter';

// Success status
export const OK: httpStatus.HttpStatusOk = 200;
export const CREATED: httpStatus.HttpStatusCreated = 201;

// Error status
export const NOT_FOUND: httpStatus.HttpStatusNotFound = 404;
export const BAD_REQUEST: httpStatus.HttpStatusBadRequest = 400;
export const UNAUTHORIZED: httpStatus.HttpStatusUnauthorized = 401;
export const INTERNAL_SERVER_ERROR: httpStatus.HttpStatusInternalServerError = 500;

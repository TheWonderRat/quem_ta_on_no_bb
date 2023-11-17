import { httpStatus } from '../../types/exporter';

// Success status
export const OK: httpStatus.HttpStatusOk = 200;
export const Created: httpStatus.HttpStatusCreated = 201;

// Error status
export const NotFound: httpStatus.HttpStatusNotFound = 404;
export const BadRequest: httpStatus.HttpStatusBadRequest = 400;
export const Unauthorized: httpStatus.HttpStatusUnauthorized = 401;
export const InternalServerError: httpStatus.HttpStatusInternalServerError = 500;

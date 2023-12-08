import { httpStatus } from '../../types/exporter';

// Success status
export const OK: httpStatus.Ok = 200;
export const CREATED: httpStatus.Created = 201;

// Error status
export const NOT_FOUND: httpStatus.NotFound = 404;
export const BAD_REQUEST: httpStatus.BadRequest = 400;
export const UNAUTHORIZED: httpStatus.Unauthorized = 401;
export const INTERNAL_SERVER_ERROR: httpStatus.InternalServerError = 500;

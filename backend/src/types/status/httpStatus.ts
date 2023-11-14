// Success status
export type HttpStatusOk = 200;
export type HttpStatusCreated = 201;

// Error status
export type HttpStatusBadRequest = 400;
export type HttpStatusUnauthorized = 401;
export type HttpStatusNotFound = 404;
export type HttpStatusInternalServerError = 500;

export type HttpStatusError = HttpStatusBadRequest
| HttpStatusUnauthorized
| HttpStatusNotFound
| HttpStatusInternalServerError;

export type HttpStatusSuccess = HttpStatusOk | HttpStatusCreated;

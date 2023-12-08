// Success status
export type Ok = 200;
export type Created = 201;

// Error status
export type BadRequest = 400;
export type Unauthorized = 401;
export type NotFound = 404;
export type InternalServerError = 500;

export type Error = BadRequest
| Unauthorized
| NotFound
| InternalServerError;

export type Success = Ok | Created;

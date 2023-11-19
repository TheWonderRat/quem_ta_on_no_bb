export type MISSING_TOKEN = 'Token de identificação nao foi encontrado!';
export type USER_NOT_FOUND = 'O usuário nao foi encontrado';
export type SERVER_SIDE_ERROR = 'Nao foi possível conectar com a base de dados';
export type DATABASE_NOT_FOUND = 'Nao foi possível conectar com a base de dados';
export type MISS_MATCHED_PASSWORD = 'Combinação usuário/senha nao confere';
export type USER_NOT_AUTHENTICATED = 'A sessão do usuário expirou';

export type ErrorMessages = MISSING_TOKEN
| USER_NOT_AUTHENTICATED
| MISS_MATCHED_PASSWORD
| USER_NOT_FOUND
| DATABASE_NOT_FOUND
| SERVER_SIDE_ERROR;

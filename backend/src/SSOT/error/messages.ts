import * as messages from '../../types/error/messages';

export const USER_NOT_FOUND: messages.USER_NOT_FOUND = 'O usuário nao foi encontrado';

export const MISSING_TOKEN: messages.MISSING_TOKEN = 'Token de identificação nao foi encontrado!';

export const USER_NOT_AUTHENTICATED: messages
  .USER_NOT_AUTHENTICATED = 'A sessão do usuário expirou';

export const MISS_MATCHED_PASSWORD: messages
  .MISS_MATCHED_PASSWORD = 'Combinação usuário/senha nao confere';

export const DATABASE_NOT_FOUND: messages
  .DATABASE_NOT_FOUND = 'Nao foi possível conectar com a base de dados';

export const SERVER_SIDE_ERROR: messages
  .SERVER_SIDE_ERROR = 'Nao foi possível conectar com a base de dados';

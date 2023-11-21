import * as messages from '../../types/error/messages';

export const USER_NOT_FOUND: messages.USER_NOT_FOUND = 'O usuário não foi encontrado!';

export const MISSING_TOKEN: messages.MISSING_TOKEN = 'Token de identificação não foi encontrado!';

export const USER_NOT_AUTHENTICATED: messages
  .USER_NOT_AUTHENTICATED = 'A sessão do usuário expirou.';

export const MISS_MATCHED_PASSWORD: messages
  .MISS_MATCHED_PASSWORD = 'Combinação usuário/senha não confere.';

export const DATABASE_NOT_FOUND: messages
  .DATABASE_NOT_FOUND = 'Não foi possível conectar com a base de dados.';

export const SERVER_SIDE_ERROR: messages
  .SERVER_SIDE_ERROR = 'Erro interno do servidor.';

export const MISSING_FIELD_LOGIN: messages
  .MISSING_FIELD_LOGIN = 'Campo obrigatório (usuário/senha) não informado.';

export const MISSING_FIELD_REGISTER: messages
  .MISSING_FIELD_REGISTER = 'Campo obrigatório (ppp/pcd/name/registry) não informado.';

export const INVALID_EMAIL: messages.INVALID_EMAIL = 'Email fornecido tem formato inválido!';

export const INVALID_REGISTRY: messages
  .INVALID_REGISTRY = 'Número de registro deve conter apenas números.';

export const INVALID_GLOBAL_POSITION: messages
  .INVALID_GLOBAL_POSITION = 'Posição na ampla concorrência deve conter apenas números.';

export const INVALID_PCD_POSITION: messages
  .INVALID_PCD_POSITION = 'Posição na concorrência PCD deve conter apenas números.';

export const INVALID_PPP_POSITION: messages
  .INVALID_PPP_POSITION = 'Posição na concorrência PPP deve conter apenas números.';

export const INVALID_PPP: messages.INVALID_PPP = 'Campo ppp deve ser booleano.';

export const INVALID_PCD: messages.INVALID_PCD = 'Campo pcd deve ser booleano.';

export const INVALID_BACKUP_REGISTER: messages
  .INVALID_BACKUP_REGISTER = 'Campo backupRegister deve ser booleano.';

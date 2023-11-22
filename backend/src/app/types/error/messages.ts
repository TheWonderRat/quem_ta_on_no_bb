// Mensagens de error de requisição
export type INVALID_PPP = 'Campo ppp deve ser booleano.';
export type INVALID_PCD = 'Campo pcd deve ser booleano.';
export type INVALID_EMAIL = 'Email fornecido tem formato inválido!';
export type MISSING_TOKEN = 'Token de identificação não foi encontrado!';
export type INVALID_REGISTRY = 'Número de registro deve conter apenas números.';
export type MISSING_FIELD_LOGIN = 'Campo obrigatório (usuário/senha) não informado.';
export type INVALID_PCD_POSITION = 'Posição na concorrência PCD deve conter apenas números.';
export type INVALID_PPP_POSITION = 'Posição na concorrência PPP deve conter apenas números.';
export type MISSING_FIELD_REGISTER = 'Campo obrigatório não informado.';
export type INVALID_BACKUP_REGISTER = 'Campo backupRegister deve ser booleano.';
export type INVALID_GLOBAL_POSITION = 'Posição na ampla concorrência deve conter apenas números.';
export type INVALID_FORMAT_REGISTER = 'O formato de registro deve ser um Array de objetos.';

export type RequestMessages = INVALID_PPP | INVALID_PCD | INVALID_EMAIL | MISSING_TOKEN
| INVALID_REGISTRY | MISSING_FIELD_LOGIN | INVALID_PCD_POSITION | INVALID_PPP_POSITION
| MISSING_FIELD_REGISTER | INVALID_BACKUP_REGISTER | INVALID_REGISTRY | INVALID_GLOBAL_POSITION
| INVALID_FORMAT_REGISTER;

// Mensagens de error para autenticação
export type INVALID_TOKEN = 'Token inválido!';
export type USER_NOT_FOUND = 'O usuário não foi encontrado!';
export type MISS_MATCHED_PASSWORD = 'Combinação usuário/senha não confere.';
export type USER_NOT_AUTHENTICATED = 'A sessão do usuário expirou.';

export type AuthMessages = INVALID_TOKEN
| USER_NOT_AUTHENTICATED
| MISS_MATCHED_PASSWORD
| USER_NOT_FOUND;

// Mensagens de erros de servidor
export type DATABASE_NOT_FOUND = 'Não foi possível conectar com a base de dados.';
export type SERVER_SIDE_ERROR = 'Erro interno do servidor.';

export type ServerMessages = DATABASE_NOT_FOUND | SERVER_SIDE_ERROR;

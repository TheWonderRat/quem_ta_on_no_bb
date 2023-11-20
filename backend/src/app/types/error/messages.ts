// Mensagens de error de requisição
export type INVALID_PPP = 'Campo ppp deve ser booleano';
export type INVALID_PCD = 'Campo pcd deve ser booleano';
export type INVALID_EMAIL = 'Email fornecido tem formato inválido';
export type MISSING_TOKEN = 'Token de identificação não foi encontrado!';
export type INVALID_REGISTRY = 'Número de registro deve conter apenas números';
export type MISSING_FIELD_LOGIN = 'Campo obrigatório (usuário/senha) não informado';
export type MISSING_FIELD_REGISTER = 'Campo obrigatório (ppp/pcd/name/registry) não informado';

export type RequestMessages = MISSING_FIELD_LOGIN | MISSING_TOKEN;

// Mensagens de error para autenticação
export type INVALID_TOKEN = 'Token inválido';
export type USER_NOT_FOUND = 'O usuário não foi encontrado';
export type MISS_MATCHED_PASSWORD = 'Combinação usuário/senha não confere';
export type USER_NOT_AUTHENTICATED = 'A sessão do usuário expirou';

export type AuthMessages = INVALID_TOKEN
| USER_NOT_AUTHENTICATED
| MISS_MATCHED_PASSWORD
| USER_NOT_FOUND;

// Mensagens de erros de servidor
export type DATABASE_NOT_FOUND = 'Não foi possível conectar com a base de dados';
export type SERVER_SIDE_ERROR = 'Erro interno do servidor';

export type ServerMessages = DATABASE_NOT_FOUND | SERVER_SIDE_ERROR;

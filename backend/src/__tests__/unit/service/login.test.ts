// library
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

// types
import { jwtTypes } from '../../../app/types/exporter';

// SSOT
import { jwtConfig, errorMessages, httpStatus } from '../../../app/SSOT/exporter';

// utils
import { AppError } from '../../../app/shared/utils/exporter';

// Repository
import { LoginRepository } from '../../../app/modules/repository/exporter';

// Camada service a ser testada
import { LoginService } from '../../../app/modules/service/exporter';

describe('Sequência de testes para o serviço de login', () => {
  // Configurações iniciais
  const service: LoginService = new LoginService();
  const oneCall: number = 1;

  const validEmail: string = 'valid_email';
  const validHash: string = 'valid_hash';
  const validPassword: string = 'valid_password';

  const invalidEmail: string = 'invalid_email';
  const invalidPassword: string = 'invalid_password';

  afterEach(() => { jest.clearAllMocks(); });

  test('Verifica se retorna um token válido', async () => {
    const spyJwt = jest.spyOn(jwt, 'sign').mockImplementation(() => 'valid_token');
    const spyBcrypt = jest.spyOn(bcrypt, 'compare').mockImplementation(() => true);
    const spyRepository = jest.spyOn(LoginRepository.prototype, 'findUserByEmail')
      .mockImplementation(async () => ({ email: validEmail, hash: validHash }));

    const token: jwtTypes.token = await service.validateUser(validEmail, validPassword);

    expect(spyRepository).toHaveBeenCalledTimes(oneCall);
    expect(spyRepository).toHaveBeenCalledWith(validEmail);

    expect(spyBcrypt).toHaveBeenCalledTimes(oneCall);
    expect(spyBcrypt).toHaveBeenCalledWith(validPassword, validHash);

    expect(spyJwt).toHaveBeenCalledTimes(oneCall);
    expect(spyJwt).toHaveBeenCalledWith(
      { email: validEmail, password: validHash },
      jwtConfig.JWT_SECRET,
      jwtConfig.JWT_SIGN_OPTIONS,
    );

    expect(token).toHaveProperty('token');
    expect(token.token).toMatch(/^valid_token$/);
  });

  test('Verifica se retorna um erro quando o usuário não é encontrado', async () => {
    jest.spyOn(LoginRepository.prototype, 'findUserByEmail')
      .mockImplementation(async () => null);

    return expect(service.validateUser(invalidEmail, validPassword)).rejects.toThrow(AppError);
  });

  test('Verifica se retorna um erro quando a senha não confere', async () => {
    jest.spyOn(LoginRepository.prototype, 'findUserByEmail')
      .mockImplementation(async () => ({ email: validEmail, hash: validHash }));

    jest.spyOn(bcrypt, 'compare').mockImplementation(() => false);

    return expect(service.validateUser(validEmail, invalidPassword)).rejects.toThrow(AppError);
  });

  test('Verifica mensagem de erro quando o usuário não é encontrado', async () => {
    const spyRepository = jest.spyOn(LoginRepository.prototype, 'findUserByEmail')
      .mockImplementation(async () => null);

    try {
      await service.validateUser(invalidEmail, validPassword);
    } catch (e) {
      expect(e).toHaveProperty('errorInfo');
      const error = e as AppError;
      expect(error.errorInfo).toHaveProperty('message');
      expect(error.errorInfo).toHaveProperty('statusCode');
      expect(error.errorInfo.message).toMatch(errorMessages.USER_NOT_FOUND);
      expect(error.errorInfo.statusCode).toBe(httpStatus.NotFound);
    }

    expect(spyRepository).toHaveBeenCalledTimes(oneCall);
    expect(spyRepository).toHaveBeenCalledWith(invalidEmail);
  });

  test('Verifica mensagem de erro quando a senha não confere', async () => {
    const spyBcrypt = jest.spyOn(bcrypt, 'compare').mockImplementation(() => false);
    const spyRepository = jest.spyOn(LoginRepository.prototype, 'findUserByEmail')
      .mockImplementation(async () => ({ email: validEmail, hash: validHash }));

    try {
      await service.validateUser(validEmail, invalidPassword);
    } catch (e) {
      expect(e).toHaveProperty('errorInfo');
      const error = e as AppError;
      expect(error.errorInfo).toHaveProperty('message');
      expect(error.errorInfo).toHaveProperty('statusCode');
      expect(error.errorInfo.message).toMatch(errorMessages.MISS_MATCHED_PASSWORD);
      expect(error.errorInfo.statusCode).toBe(httpStatus.Unauthorized);
    }
    expect(spyRepository).toHaveBeenCalledTimes(oneCall);
    expect(spyRepository).toHaveBeenCalledWith(validEmail);

    expect(spyBcrypt).toHaveBeenCalledTimes(oneCall);
    expect(spyBcrypt).toHaveBeenCalledWith(invalidPassword, validHash);
  });
});

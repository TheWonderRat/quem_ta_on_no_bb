// library
import bcrypt from 'bcrypt';
import supertest from 'supertest';
import jsonwebtoken from 'jsonwebtoken';

// types
import { login } from '../../../app/types/exporter';

// SSOT
import { errorMessages, httpStatus, jwtConfig, pathNames } from '../../../app/SSOT/exporter';

// Mocks
import { users } from '../../mocks/exporter';

// model
import { User } from '../../../app/database/ORM/model/exporter';

// Application
import App from '../../../app/app';

describe('Sequência de testes na rota de login', () => {
  const { app }: App = new App();
  const path: string = pathNames.login;
  const firstPosition: number = 0;

  const validEmail: string = 'valid_email@email.com';
  const validToken: string = 'valid_token';
  const validPassword: string = 'valid_password';

  const invalidEmail: string = 'invalid_email@email.com';
  const invalidPassword: string = 'invalid_password';

  const invalidEmailFormat: string = 'invalid_email_format';

  const validLoginInfo: login.LoginRequest = { email: validEmail, password: validPassword };

  const invalidLoginInfo: login.LoginRequest = { email: invalidEmail, password: invalidPassword };

  afterEach(() => { jest.clearAllMocks(); });

  test('Se retorna BAD REQUEST(400) e mensagem de erro, caso faltem informações de login', async () => {
    const response = await supertest(app).post(path).send({ email: validEmail });

    expect(response.status).toBe(httpStatus.BAD_REQUEST);
    expect(response.body).toHaveProperty('message');
    expect(response.body.message).toBe(errorMessages.MISSING_FIELD_LOGIN);

    const response2 = await supertest(app).post(path).send({ password: validPassword });

    expect(response2.status).toBe(httpStatus.BAD_REQUEST);
    expect(response2.body).toHaveProperty('message');
    expect(response2.body.message).toBe(errorMessages.MISSING_FIELD_LOGIN);

    const response3 = await supertest(app).post(path).send({ email: '', password: validPassword });

    expect(response3.status).toBe(httpStatus.BAD_REQUEST);
    expect(response3.body).toHaveProperty('message');
    expect(response3.body.message).toBe(errorMessages.MISSING_FIELD_LOGIN);

    const response4 = await supertest(app).post(path).send({ email: validEmail, password: '' });

    expect(response4.status).toBe(httpStatus.BAD_REQUEST);
    expect(response4.body).toHaveProperty('message');
    expect(response4.body.message).toBe(errorMessages.MISSING_FIELD_LOGIN);
  });

  test('Se retorna BAD REQUEST(400) e mensagem de erro, caso o email tenha formato inválido', async () => {
    const response = await supertest(app)
      .post(path)
      .send({ email: invalidEmailFormat, password: validPassword });

    expect(response.status).toBe(httpStatus.BAD_REQUEST);
    expect(response.body).toHaveProperty('message');
    expect(response.body.message).toBe(errorMessages.INVALID_EMAIL);
  });

  test('Se retorna OK(200) e um token em caso de sucesso', async () => {
    const fakeUser = User.build(users[firstPosition]);

    const spyModel = jest.spyOn(User, 'findOne')
      .mockImplementation(async () => Promise.resolve(fakeUser));

    const spyBcrypt = jest.spyOn(bcrypt, 'compare')
      .mockImplementation(async () => Promise.resolve(true));

    const spyJsonwebtoken = jest.spyOn(jsonwebtoken, 'sign')
      .mockImplementation(() => validToken);

    const response = await supertest(app).post(path).send(validLoginInfo);

    expect(spyModel).toHaveBeenCalled();
    expect(spyModel).toHaveBeenCalledWith({ where: { email: validEmail } });

    expect(spyBcrypt).toHaveBeenCalled();
    expect(spyBcrypt).toHaveBeenCalledWith(validPassword, fakeUser.passwordHash);

    expect(spyJsonwebtoken).toHaveBeenCalled();
    expect(spyJsonwebtoken).toHaveBeenCalledWith(
      { email: fakeUser.email, password: fakeUser.passwordHash },
      jwtConfig.JWT_SECRET,
      jwtConfig.JWT_SIGN_OPTIONS,
    );

    expect(response.status).toBe(httpStatus.OK);
    expect(response.body).toHaveProperty('token');
    expect(response.body.token).toBe(validToken);
  });

  test('Se retorna NOT FOUND(404) e mensagem de erro em caso não encontre o usuário', async () => {
    const spyModel = jest.spyOn(User, 'findOne').mockImplementation(async () => Promise.resolve(null));

    const response = await supertest(app).post(path).send(invalidLoginInfo);

    expect(spyModel).toHaveBeenCalled();
    expect(spyModel).toHaveBeenCalledWith({ where: { email: invalidEmail } });

    expect(response.status).toBe(httpStatus.NOT_FOUND);
    expect(response.body).toHaveProperty('message');
    expect(response.body.message).toBe(errorMessages.USER_NOT_FOUND);
  });

  test('Se retorna UNAUTHORIZED(401) e mensagem de erro em caso senha incorreta', async () => {
    const fakeUser = User.build(users[firstPosition]);

    const spyModel = jest.spyOn(User, 'findOne')
      .mockImplementation(async () => Promise.resolve(fakeUser));

    const spyBcrypt = jest.spyOn(bcrypt, 'compare')
      .mockImplementation(async () => Promise.resolve(false));

    const response = await supertest(app).post(path).send(invalidLoginInfo);

    expect(spyModel).toHaveBeenCalled();
    expect(spyModel).toHaveBeenCalledWith({ where: { email: invalidEmail } });

    expect(spyBcrypt).toHaveBeenCalled();
    expect(spyBcrypt).toHaveBeenCalledWith(invalidPassword, fakeUser.passwordHash);

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
    expect(response.body).toHaveProperty('message');
    expect(response.body.message).toBe(errorMessages.MISS_MATCHED_PASSWORD);
  });
});

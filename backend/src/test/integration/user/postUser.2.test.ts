// library
import bcrypt from 'bcrypt';
import supertest from 'supertest';
import jsonwebtoken from 'jsonwebtoken';

// types
import { login } from '../../../app/types/exporter';

// SSOT
import { errorMessages, httpStatus, pathNames } from '../../../app/SSOT/exporter';

// Mocks
import { users, request } from '../../mocks/exporter';

// model
import { User } from '../../../app/database/ORM/model/exporter';

// Application
import App from '../../../app/app';

describe('Sequência de testes sobre os middlewares da rota de usuários', () => {
  const { app }: App = new App();
  const path: string = pathNames.user;

  afterEach(() => { jest.clearAllMocks(); });

  // test('Se retorna OK(200) e um token em caso de sucesso', async () => {
  //   const fakeUser = User.build(users[firstPosition]);

  //   const spyModel = jest.spyOn(User, 'findOne')
  //     .mockImplementation(async () => Promise.resolve(fakeUser));

  //   const spyBcrypt = jest.spyOn(bcrypt, 'compare')
  //     .mockImplementation(async () => Promise.resolve(true));

  //   const spyJsonwebtoken = jest.spyOn(jsonwebtoken, 'sign')
  //     .mockImplementation(() => validToken);

  //   const response = await supertest(app).post(path).send(validLoginInfo);

  //   expect(spyModel).toHaveBeenCalled();
  //   expect(spyModel).toHaveBeenCalledWith({ where: { email: validEmail } });

  //   expect(spyBcrypt).toHaveBeenCalled();
  //   expect(spyBcrypt).toHaveBeenCalledWith(validPassword, fakeUser.passwordHash);

  //   expect(spyJsonwebtoken).toHaveBeenCalled();
  //   expect(spyJsonwebtoken).toHaveBeenCalledWith(
  //     { email: fakeUser.email, password: fakeUser.passwordHash },
  //     jwtConfig.JWT_SECRET,
  //     jwtConfig.JWT_SIGN_OPTIONS,
  //   );

  //   expect(response.status).toBe(httpStatus.OK);
  //   expect(response.body).toHaveProperty('token');
  //   expect(response.body.token).toBe(validToken);
  // });

  // test('Se retorna NOT FOUND(404) e mensagem de erro em caso não encontre o usuário', async () => {
  //   const spyModel = jest.spyOn(User, 'findOne').mockImplementation(async () => Promise.resolve(null));

  //   const response = await supertest(app).post(path).send(invalidLoginInfo);

  //   expect(spyModel).toHaveBeenCalled();
  //   expect(spyModel).toHaveBeenCalledWith({ where: { email: invalidEmail } });

  //   expect(response.status).toBe(httpStatus.NOT_FOUND);
  //   expect(response.body).toHaveProperty('message');
  //   expect(response.body.message).toBe(errorMessages.USER_NOT_FOUND);
  // });

  // test('Se retorna UNAUTHORIZED(401) e mensagem de erro em caso senha incorreta', async () => {
  //   const fakeUser = User.build(users[firstPosition]);

  //   const spyModel = jest.spyOn(User, 'findOne')
  //     .mockImplementation(async () => Promise.resolve(fakeUser));

  //   const spyBcrypt = jest.spyOn(bcrypt, 'compare')
  //     .mockImplementation(async () => Promise.resolve(false));

  //   const response = await supertest(app).post(path).send(invalidLoginInfo);

  //   expect(spyModel).toHaveBeenCalled();
  //   expect(spyModel).toHaveBeenCalledWith({ where: { email: invalidEmail } });

  //   expect(spyBcrypt).toHaveBeenCalled();
  //   expect(spyBcrypt).toHaveBeenCalledWith(invalidPassword, fakeUser.passwordHash);

  //   expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  //   expect(response.body).toHaveProperty('message');
  //   expect(response.body.message).toBe(errorMessages.MISS_MATCHED_PASSWORD);
  // });
});

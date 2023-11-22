// library
import supertest from 'supertest';
import { Transaction } from 'sequelize';

// SSOT
import { errorMessages, httpStatus, pathNames } from '../../../app/SSOT/exporter';

// Mocks
import { users } from '../../mocks/exporter';

// model
import { User } from '../../../app/database/ORM/model/exporter';

// Sequelize
import sequelize from '../../../app/database/ORM/connection';

// Application
import App from '../../../app/app';

describe('Sequência de testes sobre para os casos de erro da rota de usuários', () => {
  const { app }: App = new App();
  const path: string = pathNames.user;

  const transaction: Transaction = {} as Transaction;

  beforeEach(() => {
    transaction.commit = jest.fn();
    transaction.rollback = jest.fn();
  });

  afterEach(() => { jest.clearAllMocks(); });

  test('Se retorna NOT FOUND(404) e mensagem de erro, caso não seja possível acessar o banco de dados', async () => {
    const spySequelize = jest.spyOn(sequelize, 'transaction').mockResolvedValue(transaction);

    const spyModel = jest.spyOn(User, 'bulkCreate')
      .mockRejectedValue(new Error());

    const response = await supertest(app).post(path).send(users);

    expect(spyModel).toHaveBeenCalled();
    expect(spySequelize).toHaveBeenCalled();

    expect(transaction.commit).not.toHaveBeenCalled();
    expect(transaction.rollback).toHaveBeenCalled();

    expect(response.status).toBe(httpStatus.NOT_FOUND);
    expect(response.body).toHaveProperty('message');
    expect(response.body.message).toBe(errorMessages.DATABASE_NOT_FOUND);
  });
});

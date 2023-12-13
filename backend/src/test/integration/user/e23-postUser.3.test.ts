// library
import supertest from 'supertest';
import { Transaction } from 'sequelize';

// SSOT
import { httpStatus, pathNames } from '../../../app/SSOT/exporter';

// Types
import { requestTypes as RT } from '../../../app/types/exporter';

// Mocks
import { users } from '../../mocks/exporter';

// model
import { User, GlobalRanking, PcdRanking, PppRanking } from '../../../app/database/ORM/model/exporter';

// Sequelize
import sequelize from '../../../app/database/ORM/connection';

// Application
import App from '../../../app/app';

describe('Sequência de testes sobre para os casos de sucesso da rota de usuários', () => {
  const { app }: App = new App();
  const path: string = pathNames.user;

  const newUsers: RT.NewUserRequest[] = users.map((user: RT.NewUserRequest) => ({
    pcd: user.pcd,
    ppp: user.ppp,
    name: user.name,
    registry: user.registry,
    backupRegister: user.backupRegister,
    pcdPosition: user.pcdPosition,
    pppPosition: user.pppPosition,
    globalPosition: user.globalPosition,
  }));

  const transaction: Transaction = {} as Transaction;

  beforeEach(() => {
    transaction.commit = jest.fn();
    transaction.rollback = jest.fn();
  });

  afterEach(() => { jest.clearAllMocks(); });

  test('Se retorna CREATED(201) e retorne os id`s', async () => {
    const fakeUsers = User.bulkBuild(users);

    const ids: RT.NewUserId[] = fakeUsers.map(({ id, registry }: User) => ({ id, registry }));

    const spySequelize = jest.spyOn(sequelize, 'transaction').mockResolvedValue(transaction);

    const spyUserModel = jest.spyOn(User, 'bulkCreate')
      .mockResolvedValue(fakeUsers);

    const spyGlobalRankingModel = jest.spyOn(GlobalRanking, 'bulkCreate')
      .mockResolvedValue(fakeUsers);

    const spyPcdRankingModel = jest.spyOn(PcdRanking, 'bulkCreate')
      .mockResolvedValue(fakeUsers);

    const spyPppRankingModel = jest.spyOn(PppRanking, 'bulkCreate')
      .mockResolvedValue(fakeUsers);

    const response = await supertest(app).post(path).send(newUsers);

    expect(spyUserModel).toHaveBeenCalled();
    expect(spySequelize).toHaveBeenCalled();
    expect(spyPcdRankingModel).toHaveBeenCalled();
    expect(spyPppRankingModel).toHaveBeenCalled();
    expect(spyGlobalRankingModel).toHaveBeenCalled();

    expect(transaction.commit).toHaveBeenCalled();
    expect(transaction.rollback).not.toHaveBeenCalled();

    expect(response.status).toBe(httpStatus.CREATED);
    expect(response.body).toEqual(ids);
  });
});

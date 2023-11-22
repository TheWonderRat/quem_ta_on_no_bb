// Library
import { Transaction } from 'sequelize';

// types
import { migrationsTypes as MT, requestTypes as RT } from '../../../app/types/exporter';

// Mocks
import { users } from '../../mocks/exporter';

// Model
import { User, GlobalRanking, PcdRanking, PppRanking } from '../../../app/database/ORM/model/exporter';
import sequelize from '../../../app/database/ORM/connection';

// Repository a ser testado
import { UserRepository } from '../../../app/modules/repository/exporter';

describe('Sequência de testes para o repositório User', () => {
  // Configurações iniciais
  const repository: UserRepository = new UserRepository();

  const transaction: Transaction = {} as Transaction;

  let spySequelize: jest.SpyInstance;

  const newUsers: RT.NewUserRecord[] = users
    .map((newUser: RT.NewUserRecord) => ({
      pcd: newUser.pcd,
      ppp: newUser.ppp,
      name: newUser.name,
      registry: newUser.registry,
      passwordHash: newUser.passwordHash,
      backupRegister: newUser.backupRegister,
      globalPosition: newUser.globalPosition,
      pcdPosition: newUser.pcdPosition,
      pppPosition: newUser.pppPosition,
    }));

  beforeEach(() => {
    transaction.commit = jest.fn();
    transaction.rollback = jest.fn();
    spySequelize = jest.spyOn(sequelize, 'transaction')
      .mockResolvedValue(Promise.resolve(transaction));
  });

  afterEach(() => { jest.clearAllMocks(); });

  test('Verifica se é possível cadastrar um novo usuário com sucesso', async () => {
    const usersMock: User[] = User.bulkBuild(newUsers);

    const newPppIds: MT.Ranking[] = [];

    const newPcdIds: MT.Ranking[] = [];

    const newUsersIds: MT.Ranking[] = usersMock
      .map(({ id, registry }: User) => {
        const { pcd, ppp, pcdPosition, pppPosition, globalPosition }: RT.NewUserForTest = users
          .find((user: RT.NewUserForTest) => user.registry === registry) as RT.NewUserForTest;

        if (pcd) { newPcdIds.push({ userId: id, position: pcdPosition as number }); }
        if (ppp) { newPppIds.push({ userId: id, position: pppPosition as number }); }

        return { userId: id, position: globalPosition };
      });

    const globalRankingMock: GlobalRanking[] = GlobalRanking.bulkBuild(newUsersIds);
    const pcdRankingMock: PcdRanking[] = PcdRanking.bulkBuild(newPcdIds);
    const pppRankingMock: PppRanking[] = PppRanking.bulkBuild(newPppIds);

    const spyUser = jest.spyOn(User, 'bulkCreate')
      .mockResolvedValue(Promise.resolve(usersMock));

    const spyGlobalRanking = jest.spyOn(GlobalRanking, 'bulkCreate')
      .mockResolvedValue(Promise.resolve(globalRankingMock));

    const spyPcdRanking = jest.spyOn(PcdRanking, 'bulkCreate')
      .mockResolvedValue(Promise.resolve(pcdRankingMock));

    const spyPppRanking = jest.spyOn(PppRanking, 'bulkCreate')
      .mockResolvedValue(Promise.resolve(pppRankingMock));

    const usersRegisters: RT.NewUserId[] = await repository.populateUsers(newUsers) as RT.NewUserId[];

    expect(spySequelize).toHaveBeenCalled();
    expect(spySequelize).toHaveBeenCalledWith();

    expect(transaction.commit).toHaveBeenCalled();
    expect(transaction.rollback).not.toHaveBeenCalled();

    expect(spyUser).toHaveBeenCalled();
    expect(spyUser).toHaveBeenCalledWith(newUsers, { transaction });

    expect(spyGlobalRanking).toHaveBeenCalled();
    expect(spyGlobalRanking).toHaveBeenCalledWith(newUsersIds, { transaction });

    expect(spyPcdRanking).toHaveBeenCalled();
    expect(spyPcdRanking).toHaveBeenCalledWith(newPcdIds, { transaction });

    expect(spyPppRanking).toHaveBeenCalled();
    expect(spyPppRanking).toHaveBeenCalledWith(newPppIds, { transaction });

    usersRegisters.forEach((eachUser: RT.NewUserId) => {
      expect(eachUser).not.toBeNull();
      expect(eachUser).toHaveProperty('id', eachUser.id);
    });
  });

  test('Verifica se ocorrer um erro no cadastro a operação é desfeita', async () => {
    const spyUser = jest.spyOn(User, 'bulkCreate')
      .mockImplementation(() => { throw new Error('Erro ao cadastrar usuário'); });

    const usersRegisters: false | RT.NewUserId[] = await repository.populateUsers(newUsers);

    expect(spySequelize).toHaveBeenCalled();
    expect(spySequelize).toHaveBeenCalledWith();

    expect(transaction.commit).not.toHaveBeenCalled();

    expect(transaction.rollback).toHaveBeenCalled();

    expect(spyUser).toHaveBeenCalled();
    expect(spyUser).toHaveBeenCalledWith(newUsers, { transaction });

    expect(usersRegisters).toBe(false);
  });
});

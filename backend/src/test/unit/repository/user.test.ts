// types
import { requestTypes } from '../../../app/types/exporter';

// Mocks
import { users } from '../../mocks/exporter';

// Model
import { User } from '../../../app/database/ORM/model/exporter';

// Repository a ser testado
import { UserRepository } from '../../../app/modules/repository/exporter';

describe('Sequência de testes para o repositório User', () => {
  // Configurações iniciais
  const repository: UserRepository = new UserRepository();

  const newUsers: requestTypes.NewUserRecord[] = users
    .map(({ pcd, name, ppp, passwordHash, registry }: requestTypes.NewUserRecord) => ({
      pcd,
      name,
      ppp,
      passwordHash,
      registry,
    }));

  afterEach(() => { jest.clearAllMocks(); });

  test('Verifica se é possível cadastrar um novo usuário com sucesso', async () => {
    const usersMock: User[] = User.bulkBuild(newUsers);
    const spy = jest.spyOn(User, 'bulkCreate')
      .mockImplementation(async () => Promise.resolve(usersMock));

    const usersRegisters: requestTypes.NewUserId[] = await repository.createUsers(newUsers);

    expect(spy).toHaveBeenCalled();
    expect(spy).toHaveBeenCalledWith(newUsers);

    usersRegisters.forEach((eachUser: requestTypes.NewUserId) => {
      expect(eachUser).not.toBeNull();
      expect(eachUser).toHaveProperty('id', eachUser.id);
    });
  });
});

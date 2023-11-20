// types
import { userTypes } from '../../../app/types/exporter';

// Mocks
import { users } from '../../mocks/exporter';

// Model
import { User } from '../../../app/database/ORM/model/exporter';

// Repository a ser testado
import { UserRepository } from '../../../app/modules/repository/exporter';

describe('Sequência de testes para o repositório User', () => {
  // Configurações iniciais
  const repository: UserRepository = new UserRepository();

  const firstPosition: number = 0;

  const newUser: userTypes.UserRegister = {
    pcd: users[firstPosition].pcd,
    ppp: users[firstPosition].ppp,
    name: users[firstPosition].name,
    passwordHash: users[firstPosition].passwordHash,
    registry: users[firstPosition].registry,
  };

  afterEach(() => { jest.clearAllMocks(); });

  test('Verifica se é possível cadastrar um novo usuário com sucesso', async () => {
    const userMock: User = User.build(users[firstPosition]);
    const spy = jest.spyOn(User, 'create')
      .mockImplementation(async () => Promise.resolve(userMock));

    const user: userTypes.UserSavedId = await repository.createUser(newUser);

    expect(spy).toHaveBeenCalled();
    expect(spy).toHaveBeenCalledWith(newUser);

    expect(user).not.toBeNull();
    expect(user).toHaveProperty('id', userMock.id);
  });
});

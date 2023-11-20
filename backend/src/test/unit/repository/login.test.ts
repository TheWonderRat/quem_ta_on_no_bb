// types
import { login } from '../../../app/types/exporter';

// Mocks
import { users } from '../../mocks/exporter';

// Model
import { User } from '../../../app/database/ORM/model/exporter';

// Repository a ser testado
import { LoginRepository } from '../../../app/modules/repository/exporter';

describe('Sequência de testes para o repositório Login', () => {
  // Configurações iniciais
  const repository: LoginRepository = new LoginRepository();

  afterEach(() => { jest.clearAllMocks(); });

  test('Verifica se retorna um usuário válido', async () => {
    const firstPosition: number = 0;
    const userMock: User = User.build(users[firstPosition]);
    const spy = jest.spyOn(User, 'findOne')
      .mockImplementation(async () => Promise.resolve(userMock));

    const user: login.UserInfo | null = await repository.findUserByEmail(userMock.email);

    expect(spy).toHaveBeenCalled();
    expect(spy).toHaveBeenCalledWith({ where: { email: userMock.email } });

    expect(user).not.toBeNull();
    expect(user).toHaveProperty('hash', userMock.passwordHash);
    expect(user).toHaveProperty('email', userMock.email);
  });

  test('Verifica se retorna nulo caso não encontre o usuário', async () => {
    const spy = jest.spyOn(User, 'findOne').mockImplementation(async () => Promise.resolve(null));

    const user: login.UserInfo | null = await repository.findUserByEmail('usuário inválido');

    expect(spy).toHaveBeenCalled();
    expect(user).toBeNull();
  });
});

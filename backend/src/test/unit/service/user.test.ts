// types
import { requestTypes as RT } from '../../../app/types/exporter';

// SSOT
import { errorMessages, httpStatus } from '../../../app/SSOT/exporter';

// Utils
import { ServerError } from '../../../app/shared/utils/exporter';

// Mocks
import { users } from '../../mocks/exporter';

// Repository
import { UserRepository } from '../../../app/modules/repository/exporter';

// Camada service a ser testada
import { UserService } from '../../../app/modules/service/exporter';

describe('Sequência de testes para o serviço User', () => {
  // Configurações iniciais
  const service: UserService = new UserService();

  const fakeUsersIds: RT.NewUserId[] = users
    .map(({ id, registry }: RT.NewUserId) => ({ id, registry }));

  afterEach(() => { jest.clearAllMocks(); });

  test('Se o método "createUsers" retorna um UUID', async () => {
    const spyRepository = jest.spyOn(UserRepository.prototype, 'populateUsers')
      .mockResolvedValue(fakeUsersIds);

    const newUser: RT.NewUserId[] = await service.createUsers(users);

    expect(spyRepository).toHaveBeenCalled();
    expect(spyRepository).toHaveBeenCalledWith(users);

    expect(newUser).toEqual(fakeUsersIds);
  });

  test('Se o método "createUsers" lança um caso em caso de erro no cadastro', async () => {
    jest.spyOn(UserRepository.prototype, 'populateUsers')
      .mockResolvedValue(false);

    return expect(service.createUsers(users)).rejects.toThrow(ServerError);
  });

  test('Se o método "createUsers" lança o erro com as informações corretas', async () => {
    const spy = jest.spyOn(UserRepository.prototype, 'populateUsers')
      .mockResolvedValue(false);

    try {
      await service.createUsers(users);
    } catch (error) {
      expect(spy).toHaveBeenCalled();
      expect(error).toEqual(new ServerError({
        message: errorMessages.DATABASE_NOT_FOUND,
        statusCode: httpStatus.NOT_FOUND,
      }));
    }
  });
});

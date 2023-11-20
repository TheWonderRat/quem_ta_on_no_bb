// library
import bcrypt from 'bcrypt';

// types
import { userTypes } from '../../../app/types/exporter';

// SSOT
import { jwtConfig, bcryptConfig } from '../../../app/SSOT/exporter';

// Mocks
import { users } from '../../mocks/exporter';

// Repository
import { UserRepository } from '../../../app/modules/repository/exporter';

// Camada service a ser testada
import { UserService } from '../../../app/modules/service/exporter';

describe('Sequência de testes para o serviço User', () => {
  // Configurações iniciais
  const service: UserService = new UserService();

  const firstPosition: number = 0;
  const validUuid: string = 'valid_uuid';

  const fakeUser: userTypes.UserRequest = {
    name: users[firstPosition].name,
    registry: users[firstPosition].registry,
    pcd: users[firstPosition].pcd,
    ppp: users[firstPosition].ppp,
  };

  afterEach(() => { jest.clearAllMocks(); });

  test('Se o método "createUser" retorna um UUID', async () => {
    const spyBcrypt = jest.spyOn(bcrypt, 'hash').mockImplementation(() => 'valid_hash');
    const spyRepository = jest.spyOn(UserRepository.prototype, 'createUser')
      .mockImplementation(async () => ({ id: validUuid }));

    const newUser: userTypes.UserSavedId = await service.createUser(fakeUser);

    const passwordForHash = `${fakeUser.registry}${fakeUser.name}${jwtConfig.JWT_SECRET}`;

    expect(spyRepository).toHaveBeenCalled();
    expect(spyRepository).toHaveBeenCalledWith({ ...fakeUser, passwordHash: 'valid_hash' });

    expect(spyBcrypt).toHaveBeenCalled();
    expect(spyBcrypt).toHaveBeenCalledWith(passwordForHash, bcryptConfig.BCRYPT_SALT_ROUNDS);

    expect(newUser).toHaveProperty('id');
    expect(newUser.id).toBe(validUuid);
  });
});

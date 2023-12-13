// Library
import bcrypt from 'bcrypt';

// Types
import { requestTypes as RT } from '../../../app/types/exporter';

// SSOT
import { bcryptConfig, jwtConfig } from '../../../app/SSOT/exporter';

// Mocks
import { users } from '../../mocks/exporter';

// Helper a ser testado
import { UserHelper } from '../../../app/shared/helpers/exporter';

describe('Sequência de testes sobre o helper "UserHelper"', () => {
  const hash = 'valid_hash';

  const userMatch: RT.NewUserRecord[] = users.map((user: RT.NewUserRecord) => ({
    ...user,
    passwordHash: hash,
  }));

  test('Se o método "createHashedPassword" retorna um array de hash', async () => {
    const spy = jest.spyOn(bcrypt, 'hash').mockImplementation(() => hash);

    const usersWithHash: RT.NewUserRecord[] = await UserHelper.createHashedPassword(users);

    const zero = 0;
    const firstCall = 1;
    const secondCall = 2;
    const thirdCall = 3;

    expect(spy).toHaveBeenCalledTimes(users.length);
    expect(spy).toHaveBeenNthCalledWith(
      firstCall,
      `${users[zero].registry}${users[zero].name}${jwtConfig.JWT_SECRET}`,
      bcryptConfig.BCRYPT_SALT_ROUNDS,
    );
    expect(spy).toHaveBeenNthCalledWith(
      secondCall,
      `${users[firstCall].registry}${users[firstCall].name}${jwtConfig.JWT_SECRET}`,
      bcryptConfig.BCRYPT_SALT_ROUNDS,
    );
    expect(spy).toHaveBeenNthCalledWith(
      thirdCall,
      `${users[secondCall].registry}${users[secondCall].name}${jwtConfig.JWT_SECRET}`,
      bcryptConfig.BCRYPT_SALT_ROUNDS,
    );

    expect(usersWithHash).toEqual(userMatch);
  });
});

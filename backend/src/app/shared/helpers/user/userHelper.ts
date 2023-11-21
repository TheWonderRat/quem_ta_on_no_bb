// Utils
import PasswordManager from '../../utils/bcrypt/passwordManager';

// SSOT
import { jwtConfig } from '../../../SSOT/exporter';

// Types
import { requestTypes as RT } from '../../../types/exporter';

export default class UserHelper {
  public static async createHashedPassword(newUsers: RT.NewUserRequest[])
    : Promise<RT.NewUserRecord[]> {
    const usersWithPassword: Promise<RT.NewUserRecord>[] = newUsers
      .map(async (newUser: RT.NewUserRequest) => {
        const passwordHash: string = await PasswordManager.generateHash(
          `${newUser.registry}${newUser.name}${jwtConfig.JWT_SECRET}`,
        );

        return { ...newUser, passwordHash };
      });
    return Promise.all(usersWithPassword);
  }
}

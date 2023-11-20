// Abstract service
import AbstractService from '../../classes/service.class';

// types
import { userTypes } from '../../types/exporter';

// SSOT
import { jwtConfig } from '../../SSOT/exporter';

// utils
import { PasswordManager } from '../../shared/utils/exporter';

// repository
import { UserRepository } from '../repository/exporter';

export default class LoginService extends AbstractService<UserRepository> {
  constructor() {
    super(new UserRepository());
  }

  // public methods
  public async createUser(newUser: userTypes.UserRequest): Promise<userTypes.UserSavedId> {
    const passwordHash: string = await PasswordManager
      .generateHash(`${newUser.registry}${newUser.name}${jwtConfig.JWT_SECRET}`);

    return this.repository.createUser({ ...newUser, passwordHash });
  }
}

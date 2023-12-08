// Abstract service
import AbstractService from '../../classes/service.class';

// types
import { requestTypes as RT } from '../../types/exporter';

// SSOT
import { errorMessages, httpStatus } from '../../SSOT/exporter';

// utils
import { ServerError } from '../../shared/utils/exporter';

// repository
import { UserRepository } from '../repository/exporter';

export default class LoginService extends AbstractService<UserRepository> {
  constructor() {
    super(new UserRepository());
  }

  // public methods
  public async createUsers(newUsers: RT.NewUserRecord[]): Promise<RT.NewUserId[]> {
    const records: false | RT.NewUserId[] = await this.repository.populateUsers(newUsers);

    if (!records) {
      throw new ServerError({
        message: errorMessages.DATABASE_NOT_FOUND,
        statusCode: httpStatus.NOT_FOUND,
      });
    }

    return records;
  }
}

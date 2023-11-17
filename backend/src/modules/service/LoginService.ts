// libraries
import bcrypt from 'bcrypt';

// Abstract service
import AbstractService from '../../classes/service.class';

// repository
import LoginRepository from '../repository/LoginRepository';

// Error constructor
import AppError from '../../shared/utils/error/errorConstructor';

// SSOT
import { httpStatus, errorMessages } from '../../SSOT/exporter';

// types
import { jwt } from '../../types/exporter';
import User from '../../database/ORM/model/User';

export default class LoginService extends AbstractService<LoginRepository> {
  constructor() {
    super(new LoginRepository());
  }

  // public methods
  public async validateUser(email: string, password: string): Promise<jwt.token> {
    const user: User | null = await this.repository.findUserByEmail(email);

    if (!user) {
      throw new AppError({
        message: errorMessages.USER_NOT_FOUND,
        statusCode: httpStatus.NotFound,
      });
    }

    if (!bcrypt.compareSync(password, user.password)) {
      throw new AppError({
        message: errorMessages.MISS_MATCHED_PASSWORD,
        statusCode: httpStatus.Unauthorized,
      });
    }

    return { token: 'token' };
  }
}

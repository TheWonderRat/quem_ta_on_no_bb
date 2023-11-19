// Abstract service
import AbstractService from '../../classes/service.class';

// SSOT
import { httpStatus, errorMessages } from '../../SSOT/exporter';

// types
import { jwtTypes, login } from '../../types/exporter';

// utils
import { TokenManager, PasswordManager } from '../../shared/utils/exporter';

// Error constructor
import AppError from '../../shared/utils/error/errorConstructor';

// repository
import { LoginRepository } from '../repository/exporter';

export default class LoginService extends AbstractService<LoginRepository> {
  constructor() {
    super(new LoginRepository());
  }

  // public methods
  public async validateUser(email: string, password: string): Promise<jwtTypes.token> {
    const user: login.UserInfo | null = await this.repository.findUserByEmail(email);

    if (!user) {
      throw new AppError({
        message: errorMessages.USER_NOT_FOUND,
        statusCode: httpStatus.NotFound,
      });
    }

    if (!(await PasswordManager.comparePassword(password, user.hash))) {
      throw new AppError({
        message: errorMessages.MISS_MATCHED_PASSWORD,
        statusCode: httpStatus.Unauthorized,
      });
    }

    return { token: TokenManager.generateToken({ email: user.email, password: user.hash }) };
  }
}

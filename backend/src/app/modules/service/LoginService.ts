// Abstract service
import AbstractService from '../../classes/service.class';

// SSOT
import { httpStatus, errorMessages } from '../../SSOT/exporter';

// types
import { jwtTypes, login } from '../../types/exporter';

// utils
import { TokenManager, PasswordManager } from '../../shared/utils/exporter';

// Error constructor
import AuthError from '../../shared/utils/error/authError';

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
      throw new AuthError({
        message: errorMessages.USER_NOT_FOUND,
        statusCode: httpStatus.NOT_FOUND,
      });
    }

    if (!(await PasswordManager.comparePassword(password, user.hash))) {
      throw new AuthError({
        message: errorMessages.MISS_MATCHED_PASSWORD,
        statusCode: httpStatus.UNAUTHORIZED,
      });
    }

    return { token: TokenManager.generateToken({ email: user.email, password: user.hash }) };
  }
}

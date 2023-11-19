// Abstract service
import AbstractService from '../../classes/service.class';

// repository
import LoginRepository from '../repository/LoginRepository';

// utils
import { TokenManager, PasswordManager } from '../../shared/utils/exporter';

// Error constructor
import AppError from '../../shared/utils/error/errorConstructor';

// SSOT
import { httpStatus, errorMessages } from '../../SSOT/exporter';

// types
import { jwtTypes, login } from '../../types/exporter';

export default class LoginService extends AbstractService<LoginRepository> {
  constructor() {
    super(new LoginRepository());
  }

  // public methods
  public async validateUser(email: string, password: string): Promise<jwtTypes.token> {
    const user: login.LoginRequest | null = await this.repository.findUserByEmail(email);

    if (!user) {
      throw new AppError({
        message: errorMessages.USER_NOT_FOUND,
        statusCode: httpStatus.NotFound,
      });
    }

    if (!PasswordManager.comparePassword(password, user.password)) {
      throw new AppError({
        message: errorMessages.MISS_MATCHED_PASSWORD,
        statusCode: httpStatus.Unauthorized,
      });
    }

    return { token: TokenManager.generateToken({ email: user.email, password: user.password }) };
  }
}

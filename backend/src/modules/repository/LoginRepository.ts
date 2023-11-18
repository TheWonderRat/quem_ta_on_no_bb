// model
import { User } from '../../database/ORM/model/exporter';

// types
import { login } from '../../types/exporter';

export default class LoginRepository {
  // private attributes
  private readonly _user: typeof User;

  // getters
  private get user(): typeof User { return this._user; }

  // public methods
  public async findUserByEmail(email: string): Promise<login.LoginRequest | null> {
    const user: User | null = await this.user.findOne({ where: { email } });

    if (!user) { return null; }

    return {
      email: user.email,
      password: user.password,
    };
  }
}

// model
import { User } from '../../database/ORM/model/exporter';

export default class LoginRepository {
  // private attributes
  private readonly _user: typeof User;

  // getters
  private get user(): typeof User { return this._user; }

  // public methods
  public async findUserByEmail(email: string): Promise<User | null> {
    return this.user.findOne({ where: { email } });
  }
}

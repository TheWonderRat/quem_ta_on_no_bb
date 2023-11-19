// Abstract Class
import AbstractRepository from '../../classes/repository.class';

// types
import { login } from '../../types/exporter';

// model
import { User } from '../../database/ORM/model/exporter';

export default class LoginRepository extends AbstractRepository<typeof User> {
  constructor() { super(User); }

  // public methods
  public async findUserByEmail(email: string): Promise<login.UserInfo | null> {
    const user: User | null = await this.model.findOne({ where: { email } });

    if (!user) { return null; }

    return { email: user.email, hash: user.passwordHash };
  }
}

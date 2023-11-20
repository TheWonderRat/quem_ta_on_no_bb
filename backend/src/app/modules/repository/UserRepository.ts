// Abstract Repository
import AbstractRepository from '../../classes/repository.class';

// Model
import { User } from '../../database/ORM/model/exporter';

// types
import { userTypes } from '../../types/exporter';

export default class UserRepository extends AbstractRepository<typeof User> {
  constructor() { super(User); }

  public async createUser(user: userTypes.UserRegister): Promise<userTypes.UserSavedId> {
    const newUser: User = await this.model.create(user);

    return { id: newUser.id };
  }
}

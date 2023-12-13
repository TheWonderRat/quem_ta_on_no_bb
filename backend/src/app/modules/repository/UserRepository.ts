// library
import { Transaction } from 'sequelize';

// Abstract Repository
import AbstractRepository from '../../classes/repository.class';

// types
import { requestTypes as RT } from '../../types/exporter';

// Repository
import RankingRepository from './RankingRepository';

// ORM
import sequelize from '../../database/ORM/connection';

// Model
import { User } from '../../database/ORM/model/exporter';

export default class UserRepository extends AbstractRepository<typeof User> {
  // repository
  private readonly _ranking: RankingRepository;

  constructor() {
    super(User);
    this._ranking = new RankingRepository();
  }

  // getter
  private get ranking(): RankingRepository { return this._ranking; }

  // private methods
  private async createUsers(users: RT.NewUserRecord[], transaction: Transaction): Promise<User[]> {
    return this.model.bulkCreate(users, { transaction });
  }

  // public methods
  public async populateUsers(newUsers: RT.NewUserRecord[]): Promise<false | RT.NewUserId[]> {
    const transaction: Transaction = await sequelize.transaction();

    try {
      const usersRecords: User[] = await this.createUsers(newUsers, transaction);

      await this.ranking.RankingManager(usersRecords, newUsers, transaction);

      await transaction.commit();

      return usersRecords.map(({ id, registry }: User) => ({ id, registry }));
    } catch (error) {
      await transaction.rollback();
      console.log(error);
      return false;
    }
  }
}

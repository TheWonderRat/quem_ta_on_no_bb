// Library
import { Transaction } from 'sequelize';

// Abstract Repository
import AbstractRepository from '../../classes/repository.class';

// Types
import { migrationsTypes as MT, requestTypes as RT } from '../../types/exporter';

// Model
import { GlobalRanking, PcdRanking, PppRanking, User } from '../../database/ORM/model/exporter';

export default class RankingRepository extends AbstractRepository<typeof GlobalRanking> {
  // models
  private readonly _modelPcd: typeof PcdRanking = PcdRanking;
  private readonly _modelPpp: typeof PppRanking = PppRanking;

  constructor() { super(GlobalRanking); }

  // getters
  private get modelPcd(): typeof PcdRanking { return this._modelPcd; }

  private get modelPpp(): typeof PppRanking { return this._modelPpp; }

  // public methods
  public async RankingManager(
    usersRecords: User[],
    newUsers: RT.NewUserRecord[],
    t: Transaction,
  ): Promise<void> {
    const userToPcd: MT.Ranking[] = [];
    const userToPpp: MT.Ranking[] = [];

    const allUsers: MT.Ranking[] = usersRecords.map(({ id, registry, pcd, ppp }: User) => {
      const oneUser: RT.NewUserRecord = newUsers
        .find((user: RT.NewUserRecord) => user.registry === registry) as RT.NewUserRecord;

      if (pcd) {
        userToPcd.push({ userId: id, position: oneUser.pcdPosition as number });
      }

      if (ppp) { userToPpp.push({ userId: id, position: oneUser.pppPosition as number }); }

      return { position: oneUser.globalPosition, userId: id };
    });

    await this.registerInGlobal(allUsers, t);
    await this.registerInPcd(userToPcd, t);
    await this.registerInPpp(userToPpp, t);
  }

  // Private methods
  private async registerInGlobal(info: MT.Ranking[], t: Transaction): Promise<GlobalRanking[]> {
    return this.model.bulkCreate(info, { transaction: t });
  }

  private async registerInPcd(info: MT.Ranking[], t: Transaction): Promise<PcdRanking[] | false> {
    return (!!info.length) && this.modelPcd.bulkCreate(info, { transaction: t });
  }

  private async registerInPpp(info: MT.Ranking[], t: Transaction): Promise<PppRanking[] | false> {
    return (!!info.length) && this.modelPpp.bulkCreate(info, { transaction: t });
  }
}

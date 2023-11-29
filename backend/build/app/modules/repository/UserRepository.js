"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Abstract Repository
const repository_class_1 = __importDefault(require("../../classes/repository.class"));
// Repository
const RankingRepository_1 = __importDefault(require("./RankingRepository"));
// ORM
const connection_1 = __importDefault(require("../../database/ORM/connection"));
// Model
const exporter_1 = require("../../database/ORM/model/exporter");
class UserRepository extends repository_class_1.default {
    constructor() {
        super(exporter_1.User);
        this._ranking = new RankingRepository_1.default();
    }
    // getter
    get ranking() { return this._ranking; }
    // private methods
    async createUsers(users, transaction) {
        return this.model.bulkCreate(users, { transaction });
    }
    // public methods
    async populateUsers(newUsers) {
        const transaction = await connection_1.default.transaction();
        try {
            const usersRecords = await this.createUsers(newUsers, transaction);
            await this.ranking.RankingManager(usersRecords, newUsers, transaction);
            await transaction.commit();
            return usersRecords.map(({ id, registry }) => ({ id, registry }));
        }
        catch (error) {
            await transaction.rollback();
            console.log(error);
            return false;
        }
    }
}
exports.default = UserRepository;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Abstract Repository
const repository_class_1 = __importDefault(require("../../classes/repository.class"));
// Model
const exporter_1 = require("../../database/ORM/model/exporter");
class RankingRepository extends repository_class_1.default {
    constructor() {
        super(exporter_1.GlobalRanking);
        // models
        this._modelPcd = exporter_1.PcdRanking;
        this._modelPpp = exporter_1.PppRanking;
    }
    // getters
    get modelPcd() { return this._modelPcd; }
    get modelPpp() { return this._modelPpp; }
    // public methods
    async RankingManager(usersRecords, newUsers, t) {
        const userToPcd = [];
        const userToPpp = [];
        const allUsers = usersRecords.map(({ id, registry, pcd, ppp }) => {
            const oneUser = newUsers
                .find((user) => user.registry === registry);
            if (pcd) {
                userToPcd.push({ userId: id, position: oneUser.pcdPosition });
            }
            if (ppp) {
                userToPpp.push({ userId: id, position: oneUser.pppPosition });
            }
            return { position: oneUser.globalPosition, userId: id };
        });
        await this.registerInGlobal(allUsers, t);
        await this.registerInPcd(userToPcd, t);
        await this.registerInPpp(userToPpp, t);
    }
    // Private methods
    async registerInGlobal(info, t) {
        return this.model.bulkCreate(info, { transaction: t });
    }
    async registerInPcd(info, t) {
        return (!!info.length) && this.modelPcd.bulkCreate(info, { transaction: t });
    }
    async registerInPpp(info, t) {
        return (!!info.length) && this.modelPpp.bulkCreate(info, { transaction: t });
    }
}
exports.default = RankingRepository;

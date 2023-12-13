// library
import { Sequelize } from 'sequelize';

// models
import * as models from '../../database/ORM/model/exporter';

export type ModelsTypes = Sequelize
| models.User
| models.City
| models.Class
| models.Department
| models.JobLocation
| models.StatusUser
| models.PcdRanking
| models.PppRanking
| models.GlobalRanking;

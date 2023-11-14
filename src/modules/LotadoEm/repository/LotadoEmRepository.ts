import { myDataSource } from "@shared/typeorm"
import { LotadoEm } from "../entity/LotadoEm"
import LotadoEmsDBConstants from "../constants/LotadoEmDBConstants";
import { Repository } from 'typeorm'


class LotadoEmRepository extends Repository<LotadoEm>{
  
}

export const LotadoEmRepo = new LotadoEmRepository(LotadoEm,myDataSource.manager);

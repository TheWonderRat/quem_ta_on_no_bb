import { myDataSource } from '@shared/typeorm';
import { Repository } from 'typeorm';
import { Diretoria } from '../entity/Diretoria';
import DiretoriasDBConstants from '../constants/DiretoriaDBConstants';

class DiretoriaRepository extends Repository<Diretoria> {
}

export const DiretoriasRepo = new DiretoriaRepository(Diretoria, myDataSource.manager);

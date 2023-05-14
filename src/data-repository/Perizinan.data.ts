import AppDataSource from '../orm.config';
import { Perizinan } from '../entity/Perizinan.entity';

const repository = AppDataSource.getRepository(Perizinan);

export async function upsertPerizinan(data: Perizinan) {
  return await repository.save(data);
}

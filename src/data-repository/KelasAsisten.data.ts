import AppDataSource from '../orm.config';
import { KelasAsisten } from '../entity/KelasAsisten.entity';

const repository = AppDataSource.getRepository(KelasAsisten);

export async function upsertKelasAsisten(data: KelasAsisten) {
  return await repository.save(data);
}

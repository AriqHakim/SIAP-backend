import AppDataSource from '../orm.config';
import { Presensi } from '../entity/Presensi.entity';

const repository = AppDataSource.getRepository(Presensi);

export async function upsertPresensi(data: Presensi) {
  return await repository.save(data);
}

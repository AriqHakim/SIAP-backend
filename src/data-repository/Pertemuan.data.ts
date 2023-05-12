import AppDataSource from '../orm.config';
import { Pertemuan } from '../entity/Pertemuan.entity';

const repository = AppDataSource.getRepository(Pertemuan);

export async function upsertPertemuan(data: Pertemuan) {
  return await repository.save(data);
}

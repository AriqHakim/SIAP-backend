import AppDataSource from '../orm.config';
import { Pertemuan } from '../entity/Pertemuan.entity';
import { FindOneOptions } from 'typeorm';

const repository = AppDataSource.getRepository(Pertemuan);

export async function upsertPertemuan(data: Pertemuan) {
  return await repository.save(data);
}

export async function getPertemuanByIndex(kelasId: string, idx: number) {
  const options: FindOneOptions<Pertemuan> = {
    where: {
      indexPert: idx,
      kelas: {
        id: kelasId,
      },
    },
    relations: ['kelas'],
  };
  return await repository.findOne(options);
}

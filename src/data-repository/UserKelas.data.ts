import AppDataSource from '../orm.config';
import { UserKelas } from '../entity/UserKelas.entity';
import { FindOneOptions } from 'typeorm';

const repository = AppDataSource.getRepository(UserKelas);

export async function upsertUserKelas(data: UserKelas) {
  return await repository.save(data);
}

export async function searchUserKelas(kelasId: string, userId: string) {
  const options: FindOneOptions<UserKelas> = {
    where: {
      user: {
        id: userId,
      },
      kelas: {
        id: kelasId,
      },
    },
    relations: ['user', 'kelas'],
  };
  return await repository.findOne(options);
}

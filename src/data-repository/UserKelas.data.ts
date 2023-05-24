import AppDataSource from '../orm.config';
import { UserKelas } from '../entity/UserKelas.entity';
import { FindManyOptions, FindOneOptions, FindOptionsWhere } from 'typeorm';

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

export async function getUserKelasByKelasID(id: string) {
  const options: FindManyOptions<UserKelas> = {
    where: {
      kelas: {
        id: id,
      },
    },
    relations: ['user', 'kelas'],
  };

  return await repository.find(options);
}

export async function deleteByID(id: string) {
  const options: FindOptionsWhere<UserKelas> = {
    id: id,
  };
  return await repository.delete(options);
}

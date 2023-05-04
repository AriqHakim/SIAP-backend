import AppDataSource from '../orm.config';
import { Kelas } from '../entity/Kelas.entity';
import { FindManyOptions } from 'typeorm';

const repository = AppDataSource.getRepository(Kelas);

export async function GetAllKelasByUserID(userId: string) {
  const options: FindManyOptions<Kelas> = {
    where: {
      userKelas: {
        user: {
          id: userId,
        },
      },
    },
    relations: ['userKelas', 'userKelas.kelas'],
  };

  return await repository.find(options);
}

export async function GetAllKelasByAsistenID(asistenId: string) {
  const options: FindManyOptions<Kelas> = {
    where: {
      asisten: {
        id: asistenId,
      },
    },
    relations: ['asisten'],
  };

  return await repository.find(options);
}

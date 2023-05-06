import AppDataSource from '../orm.config';
import { KelasAsisten } from '../entity/KelasAsisten.entity';
import { FindManyOptions } from 'typeorm';

const repository = AppDataSource.getRepository(KelasAsisten);

export async function upsertKelasAsisten(data: KelasAsisten) {
  return await repository.save(data);
}

export async function getAsistenByKelas(kelasId: string) {
  const options: FindManyOptions<KelasAsisten> = {
    select: {
      id: true,
      kelas: {
        id: false,
      },
      asisten: {
        id: true,
        instansi: false,
        user: {
          id: true,
          email: false,
          name: true,
          password: false,
          npm: false,
        },
      },
    },
    where: {
      kelas: {
        id: kelasId,
      },
    },
    relations: ['kelas', 'asisten', 'asisten.user'],
  };
  return await repository.find(options);
}

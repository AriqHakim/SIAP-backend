import AppDataSource from '../orm.config';
import { Kelas } from '../entity/Kelas.entity';
import { FindManyOptions } from 'typeorm';

const repository = AppDataSource.getRepository(Kelas);

export async function GetAllKelasByUserID(userId: string) {
  const options: FindManyOptions<Kelas> = {
    select: {
      id: true,
      judul: true,
      deskripsi: true,
      kode: false,
      userKelas: {
        user: {
          id: false,
          email: false,
          name: false,
          password: false,
          npm: false,
        },
      },
    },
    where: {
      userKelas: {
        user: {
          id: userId,
        },
      },
    },
    relations: ['userKelas', 'userKelas.user'],
  };

  return await repository.find(options);
}

export async function GetAllKelasByAsistenID(asistenId: string) {
  const options: FindManyOptions<Kelas> = {
    select: {
      id: true,
      judul: true,
      deskripsi: true,
      kode: false,
      asisten: {
        id: false,
        instansi: false,
      },
    },
    where: {
      asisten: {
        id: asistenId,
      },
    },
    relations: ['asisten'],
  };

  return await repository.find(options);
}

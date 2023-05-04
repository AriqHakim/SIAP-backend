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
      asistenKelas: {
        id: false,
        asisten: {
          id: true,
          instansi: false,
          user: {
            id: true,
            email: false,
            name: true,
            password: false,
            npm: true,
          },
        },
      },
    },
    where: {
      asistenKelas: {
        asisten: {
          id: asistenId,
        },
      },
    },
    relations: [
      'asistenKelas',
      'asistenKelas.asisten',
      'asistenKelas.asisten.user',
    ],
  };

  return await repository.find(options);
}
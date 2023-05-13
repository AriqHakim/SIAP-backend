import AppDataSource from '../orm.config';
import { Kelas } from '../entity/Kelas.entity';
import { FindManyOptions, FindOneOptions } from 'typeorm';

const repository = AppDataSource.getRepository(Kelas);

export async function getAllKelasByUserID(userId: string) {
  const options: FindManyOptions<Kelas> = {
    select: {
      id: true,
      judul: true,
      deskripsi: true,
      userKelas: {
        id: false,
      },
      asistenKelas: {
        id: true,
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
    },
    where: {
      userKelas: {
        user: {
          id: userId,
        },
      },
    },
    relations: [
      'userKelas',
      'userKelas.user',
      'asistenKelas',
      'asistenKelas.asisten',
      'asistenKelas.asisten.user',
    ],
  };

  return await repository.find(options);
}

export async function getAllKelasByAsistenID(asistenId: string) {
  const options: FindManyOptions<Kelas> = {
    select: {
      id: true,
      judul: true,
      deskripsi: true,
      kode: false,
      asistenKelas: {
        id: true,
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

export async function upsertKelas(data: Kelas) {
  return await repository.save(data);
}

export async function getKelasByKode(kode: string) {
  const options: FindOneOptions<Kelas> = {
    where: {
      kode: kode,
    },
  };

  return await repository.findOne(options);
}

export async function getKelasByJudul(judul: string) {
  const options: FindOneOptions<Kelas> = {
    where: {
      judul: judul,
    },
  };

  return await repository.findOne(options);
}

export async function getKelasByID(id: string) {
  return await repository.findOne({
    where: {
      id: id,
    },
  });
}

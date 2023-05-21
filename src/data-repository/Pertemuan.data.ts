import AppDataSource from '../orm.config';
import { Pertemuan } from '../entity/Pertemuan.entity';
import { FindManyOptions, FindOneOptions } from 'typeorm';

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

export async function getPertemuanByID(id: string) {
  const options: FindOneOptions<Pertemuan> = {
    where: {
      id: id,
    },
    relations: ['kelas'],
  };
  return await repository.findOne(options);
}

export async function getPertemuanByKelasID(id: string) {
  const options: FindManyOptions<Pertemuan> = {
    where: {
      kelas: {
        id: id,
      },
    },
    order: {
      indexPert: 'ASC',
    },
    relations: ['kelas'],
  };
  return await repository.find(options);
}

export async function getPresensiPertemuanByKelasID(
  id: string,
  userid: string,
) {
  const options: FindManyOptions<Pertemuan> = {
    select: {
      id: true,
      judul: true,
      startDate: true,
      kelas: {
        id: false,
      },
      presensi: {
        id: true,
        bukti: false,
        status: true,
        isValidate: true,
        user: {
          id: true,
          npm: true,
          name: true,
        },
      },
    },
    where: {
      kelas: {
        id: id,
      },
      presensi: {
        user: {
          id: userid,
        },
      },
    },
    relations: ['kelas', 'presensi', 'presensi.user'],
  };
  return await repository.find(options);
}

export async function deletePertemuanByID(id: string) {
  return await repository.delete({ id: id });
}

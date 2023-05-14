import AppDataSource from '../orm.config';
import { Presensi } from '../entity/Presensi.entity';
import { FindManyOptions, FindOneOptions } from 'typeorm';
import { countTotalData } from '../framework/utils';

const repository = AppDataSource.getRepository(Presensi);

export async function upsertPresensi(data: Presensi) {
  return await repository.save(data);
}

export async function getPresensiByPertemuan(
  id: string,
  limit: number,
  offset: number,
) {
  const options: FindManyOptions<Presensi> = {
    where: {
      pertemuan: {
        id: id,
      },
    },
    take: limit,
    skip: offset,
    relations: ['pertemuan'],
  };

  return {
    data: await repository.find({
      ...options,
    }),
    total_data: await countTotalData(Presensi, options),
  };
}

export async function getPresensiByUserKelas(kelasId: string, userId: string) {
  const options: FindOneOptions<Presensi> = {
    select: {
      pertemuan: {
        id: false,
      },
      user: {
        id: true,
        name: true,
        npm: true,
      },
    },
    where: {
      pertemuan: {
        kelas: {
          id: kelasId,
        },
      },
      user: {
        id: userId,
      },
    },
    relations: ['pertemuan', 'pertemuan.kelas', 'user'],
  };

  return await repository.findOne(options);
}

export async function getPresensiByPertemuanUser(
  pertemuanId: string,
  userId: string,
) {
  const options: FindOneOptions<Presensi> = {
    select: {
      pertemuan: {
        id: false,
      },
      user: {
        id: true,
        name: true,
        npm: true,
      },
    },
    where: {
      pertemuan: {
        id: pertemuanId,
      },
      user: {
        id: userId,
      },
    },
    relations: ['pertemuan', 'user'],
  };

  return await repository.findOne(options);
}

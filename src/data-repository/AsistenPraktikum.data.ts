import AppDataSource from '../orm.config';
import { AsistenPraktikum } from '../entity/AsistenPraktikum.entity';
import { FindManyOptions, ILike } from 'typeorm';
import { PaginationResult } from '../framework/pagination.interface';
import { countTotalData } from '../framework/utils';

const repository = AppDataSource.getRepository(AsistenPraktikum);

export async function upsertAsisten(asisten: AsistenPraktikum) {
  return await repository.save(asisten);
}

export async function getAsistenByID(id: string) {
  return await repository.findOne({
    where: {
      id: id,
    },
  });
}

export async function getAsistenByUserID(userId: string) {
  return await repository.findOne({
    join: {
      alias: 'asisten',
      innerJoin: {
        user: 'asisten.user',
      },
    },
    where: {
      user: {
        id: userId,
      },
    },
  });
}

export async function GetAsistenWithQuery(
  offset: number,
  limit: number,
  query: string,
): Promise<PaginationResult<AsistenPraktikum>> {
  const options: FindManyOptions<AsistenPraktikum> = {
    select: {
      id: true,
      instansi: false,
      user: {
        id: true,
        email: true,
        name: true,
        npm: true,
        password: false,
        noTelp: false,
      },
    },
    take: limit,
    skip: offset,
    where: {
      user: {
        name: query ? ILike(`%${query}%`) : undefined,
      },
    },
    relations: ['user'],
  };

  return {
    data: await repository.find(options),
    total_data: await countTotalData(AsistenPraktikum, options),
  };
}

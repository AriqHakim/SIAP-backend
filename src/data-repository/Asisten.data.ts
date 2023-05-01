import AppDataSource from '../../orm.config';
import { AsistenPraktikum } from '../../entity/AsistenPraktikum.entity';

export async function upsertAsisten(asisten: AsistenPraktikum) {
  return await AppDataSource.getRepository(AsistenPraktikum).save(asisten);
}

export async function getAsistenByID(id: string) {
  return await AppDataSource.getRepository(AsistenPraktikum).findOne({
    where: {
      id: id,
    },
  });
}

export async function getAsistenByUserID(userId: string) {
  return await AppDataSource.getRepository(AsistenPraktikum).findOne({
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

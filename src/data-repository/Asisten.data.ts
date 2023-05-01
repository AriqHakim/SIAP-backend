import AppDataSource from '../orm.config';
import { AsistenPraktikum } from '../entity/AsistenPraktikum.entity';

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

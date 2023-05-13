import AppDataSource from '../orm.config';
import { Broadcast } from '../entity/Broadcast.entity';

const repository = AppDataSource.getRepository(Broadcast);

export async function upsertBroadcast(data: Broadcast) {
  return await repository.save(data);
}
import AppDataSource from '../../orm.config';
import { User } from '../../entity/User.entity';

export async function upsertUser(user: User): Promise<User> {
  return await AppDataSource.getRepository(User).save(user);
}

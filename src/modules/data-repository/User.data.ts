import AppDataSource from '../../orm.config';
import { User } from '../../entity/User.entity';

export async function upsertUser(user: User): Promise<User> {
  return await AppDataSource.getRepository(User).save(user);
}

export async function getUserByEmail(email: string) {
  return await AppDataSource.getRepository(User).findOne({
    where: {
      email: email,
    },
  });
}

export async function getUserByID(id: string) {
  return await AppDataSource.getRepository(User).findOne({
    where: {
      id: id,
    },
  });
}

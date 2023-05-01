import AppDataSource from '../orm.config';
import { User } from '../entity/User.entity';

const repository = AppDataSource.getRepository(User);

export async function upsertUser(user: User): Promise<User> {
  return await repository.save(user);
}

export async function getUserByEmail(email: string) {
  return await repository.findOne({
    where: {
      email: email,
    },
  });
}

export async function getUserByID(id: string) {
  return await repository.findOne({
    where: {
      id: id,
    },
  });
}

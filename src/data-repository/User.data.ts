import AppDataSource from '../orm.config';
import { User } from '../entity/User.entity';
import { FindManyOptions } from 'typeorm';

const repository = AppDataSource.getRepository(User);

export async function upsertUser(user: User): Promise<User> {
  return await repository.save(user);
}

export async function getUserByEmail(email: string) {
  const options: FindManyOptions<User> = {
    select: {
      id: true,
      email: true,
      name: true,
      npm: true,
      noTelp: true,
      password: false,
    },
    where: {
      email: email,
    },
  };
  return await repository.findOne(options);
}

export async function getUserByID(id: string) {
  const options: FindManyOptions<User> = {
    select: {
      id: true,
      email: true,
      name: true,
      npm: true,
      noTelp: true,
      password: false,
    },
    where: {
      id: id,
    },
  };
  return await repository.findOne(options);
}

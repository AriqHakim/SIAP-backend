import { User } from '../entity/User.entity';
import AppDataSource from '../orm.config';
import { FindManyOptions, ILike } from 'typeorm';
import { PaginationResult } from '../framework/pagination.interface';
import { countTotalData } from '../framework/utils';

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

export async function getUsersWithQuery(
  offset: number,
  limit: number,
  query: string,
): Promise<PaginationResult<User>> {
  const options: FindManyOptions<User> = {
    select: {
      id: true,
      email: true,
      name: true,
      npm: true,
      noTelp: true,
      password: false,
    },
    take: limit,
    skip: offset,
    where: {
      name: query ? ILike(`%${query}%`) : undefined,
    },
  };
  return {
    data: await repository.find(options),
    total_data: await countTotalData(User, options),
  };
}

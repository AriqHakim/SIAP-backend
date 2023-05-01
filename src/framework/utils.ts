import { Request } from 'express';
import AppDataSource from '../orm.config';
import { EntityTarget, FindManyOptions } from 'typeorm';
import { BadRequestError } from './error.interface';

export async function countTotalData<T>(
  entity: EntityTarget<T>,
  options?: FindManyOptions<T>,
) {
  delete options.take;
  delete options.skip;
  return await AppDataSource.getRepository(entity).count(options);
}

export function parseQueryToInt(query: Request['query'], source: string) {
  if (query[source] === undefined) {
    throw new BadRequestError(`Field '${source}' can not be undefined`);
  }
  const parsed_value = parseInt(query[source] as string);
  if (isNaN(parsed_value)) {
    throw new BadRequestError(`Field '${source}' is not a number`);
  }
  return parsed_value;
}
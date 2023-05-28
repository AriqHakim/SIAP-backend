import { Request } from 'express';
import AppDataSource from '../orm.config';
import { EntityTarget, FindManyOptions } from 'typeorm';
import { BadRequestError } from './error.interface';
import { DateTime } from 'luxon';

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

export function randomString(length: number): string {
  let result = '';
  const characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

export function dateConverter(str: string, options?: any) {
  const date = DateTime.fromISO(str, {
    ...options,
    zone: 'Asia/Jakarta',
  }).toJSDate();
  if (date === undefined || date === null) {
    throw new BadRequestError(`Field date format invalid, must be ISO Format`);
  }
  return date;
}

export function giveCurrentDateTime() {
  const today = new Date();
  const date =
    today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
  const time =
    today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();
  const dateTime = date + '_' + time;
  return dateTime;
}

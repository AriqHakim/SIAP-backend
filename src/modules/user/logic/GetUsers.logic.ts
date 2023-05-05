import { getUsersWithQuery } from '../../../data-repository/User.data';
import { GetUsersInterface } from '../User.interface';

export async function getUsersLogic(data: GetUsersInterface) {
  data.limit = data.limit ?? 10;
  data.offset = data.offset ?? 0;
  return await getUsersWithQuery(data.offset, data.limit, data.q);
}

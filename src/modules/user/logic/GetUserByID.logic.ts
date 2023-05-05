import { getUserByID } from '../../../data-repository/User.data';

export async function getUserByIDLogic(id: string) {
  return await getUserByID(id);
}

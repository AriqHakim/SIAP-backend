import { getAsistenWithQuery } from '../../../data-repository/AsistenPraktikum.data';
import { GetAsistenInterface } from '../Asisten.interface';

export async function getAsistenLogic(data: GetAsistenInterface) {
  data.limit = data.limit ?? 10;
  data.offset = data.offset ?? 0;
  return await getAsistenWithQuery(data.offset, data.limit, data.q);
}

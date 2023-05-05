import { GetAsistenWithQuery } from '../../../data-repository/AsistenPraktikum.data';
import { GetAsistenInterface } from '../Asisten.interface';

export async function GetAsistenLogic(data: GetAsistenInterface) {
  return await GetAsistenWithQuery(data.offset, data.limit, data.q);
}

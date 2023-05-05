import { Kelas } from '../../../entity/Kelas.entity';
import { GetAllKelasInterface } from '../Kelas.interface';
import {
  GetAllKelasByAsistenID,
  GetAllKelasByUserID,
} from '../../../data-repository/Kelas.data';

export async function GetAllKelasLogic(data: GetAllKelasInterface) {
  const kelas: Kelas[] = await GetAllKelasByUserID(data.user.id);
  const owned: Kelas[] = data.asisten
    ? await GetAllKelasByAsistenID(data.asisten.id)
    : null;

  return {
    kelas,
    owned,
  };
}

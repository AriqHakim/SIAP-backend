import { Kelas } from '../../../entity/Kelas.entity';
import { GetAllKelasInterface } from '../Kelas.interface';
import {
  getAllKelasByAsistenID,
  getAllKelasByUserID,
} from '../../../data-repository/Kelas.data';
import { getAsistenByKelas } from '../../../data-repository/KelasAsisten.data';

export async function GetAllKelasLogic(data: GetAllKelasInterface) {
  const kelas: Kelas[] = await getAllKelasByUserID(data.user.id);
  const owned: Kelas[] = data.asisten
    ? await getAllKelasByAsistenID(data.asisten.id)
    : null;

  if (data.asisten) {
    for (let i = 0; i < owned.length; i++) {
      owned[i].asistenKelas = await getAsistenByKelas(owned[i].id);
    }
  }

  return {
    kelas,
    owned,
  };
}

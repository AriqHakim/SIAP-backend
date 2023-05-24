import { PaginationResult } from '../../../framework/pagination.interface';
import { GetKelasByIDInterface } from '../Kelas.interface';
import { UserKelas } from '../../../entity/UserKelas.entity';
import { getUserKelasByKelasID } from '../../../data-repository/UserKelas.data';
import { getKelasByID } from '../../../data-repository/Kelas.data';
import {
  BadRequestError,
  NotFoundError,
} from '../../../framework/error.interface';
import { getAsistenByKelas } from '../../../data-repository/KelasAsisten.data';

export async function getUserByKelasLogic(data: GetKelasByIDInterface) {
  const kelas = await getKelasByID(data.kelasId);
  if (!kelas) {
    throw new NotFoundError('Kelas tidak ditemukan!');
  }

  const asistenKelas = await getAsistenByKelas(kelas.id);
  let isOwned = false;
  for (let i = 0; i < asistenKelas.length; i++) {
    isOwned = asistenKelas[i].asisten.id === data.asisten.id;
    if (isOwned) {
      break;
    }
  }
  if (!isOwned) {
    throw new BadRequestError('Anda bukan pemilik kelas');
  }
  const result: PaginationResult<UserKelas> = await getUserKelasByKelasID(
    data.kelasId,
  );

  return result;
}

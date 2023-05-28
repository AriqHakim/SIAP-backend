import { getKelasByID } from '../../../data-repository/Kelas.data';
import { DeletePraktikanByUserIDInterface } from '../Kelas.interface';
import {
  BadRequestError,
  NotFoundError,
} from '../../../framework/error.interface';
import { getAsistenByKelas } from '../../../data-repository/KelasAsisten.data';
import {
  deleteByID,
  searchUserKelas,
} from '../../../data-repository/UserKelas.data';
import {
  bulkDeletePresensi,
  getPresensiByUserKelas,
} from '../../../data-repository/Presensi.data';

export async function deletePraktikanByUserIDLogic(
  data: DeletePraktikanByUserIDInterface,
) {
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

  const userKelas = await searchUserKelas(data.kelasId, data.userId);
  if (!userKelas) {
    throw new BadRequestError('User tidak ada dalam kelas!');
  }

  const presensiUser = await getPresensiByUserKelas(kelas.id, data.user.id);
  const presensi: string[] = [];
  for (let i = 0; i < presensiUser.length; i++) {
    presensi.push(presensiUser[i].id);
  }

  await bulkDeletePresensi(presensi);

  const result = await deleteByID(userKelas.id);

  return result.affected == 1;
}

import { getKelasByID } from '../../../data-repository/Kelas.data';
import { getPresensiByID } from '../../../data-repository/Presensi.data';
import { PresensiByIdInterface } from '../Presensi.interface';
import {
  BadRequestError,
  NotFoundError,
} from '../../../framework/error.interface';
import { getAsistenByKelas } from '../../../data-repository/KelasAsisten.data';

export async function getPresensiByIDLogic(data: PresensiByIdInterface) {
  const kelas = await getKelasByID(data.kelasId);
  if (!kelas) {
    throw new NotFoundError('Kelas tidak ditemukan!');
  }

  const asistenKelas = await getAsistenByKelas(kelas.id);
  let isOwned = false;
  for (let i = 0; i < asistenKelas.length; i++) {
    isOwned = asistenKelas[i].asisten.id === data.asisten.id;
  }
  if (!isOwned) {
    throw new BadRequestError('Anda bukan pemilik kelas');
  }

  return await getPresensiByID(data.presensiId);
}

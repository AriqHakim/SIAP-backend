import { getKelasByID } from '../../../data-repository/Kelas.data';
import { deletePertemuanByIDInterface } from '../pertemuan.interface';
import {
  BadRequestError,
  NotFoundError,
} from '../../../framework/error.interface';
import { getAsistenByKelas } from '../../../data-repository/KelasAsisten.data';
import { deletePertemuanByID } from '../../../data-repository/Pertemuan.data';

export async function deletePertemuanByIDLogic(
  data: deletePertemuanByIDInterface,
) {
  const kelas = await getKelasByID(data.kelasId);
  if (!kelas) {
    throw new NotFoundError('Kelas tidak ditemukan');
  }
  const asistenKelas = await getAsistenByKelas(data.kelasId);
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

  const result = await deletePertemuanByID(data.pertemuanId);

  return result.affected === 1;
}

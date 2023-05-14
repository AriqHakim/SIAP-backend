import { getKelasByID } from '../../../data-repository/Kelas.data';
import { getPertemuanByKelasInterface } from '../pertemuan.interface';
import { NotFoundError } from '../../../framework/error.interface';
import {
  getPertemuanByKelasID,
  getPresensiPertemuanByKelasID,
} from '../../../data-repository/Pertemuan.data';

export async function getPertemuanByKelasLogic(
  data: getPertemuanByKelasInterface,
) {
  const kelas = await getKelasByID(data.kelasId);
  if (!kelas) {
    throw new NotFoundError('Kelas tidak ditemukan!');
  }

  if (data.asisten) {
    return await getPertemuanByKelasID(kelas.id);
  } else {
    return await getPresensiPertemuanByKelasID(kelas.id, data.user.id);
  }
}

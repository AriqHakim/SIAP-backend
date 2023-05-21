import { getKelasByID } from '../../../data-repository/Kelas.data';
import { getPertemuanByKelasInterface } from '../pertemuan.interface';
import { NotFoundError } from '../../../framework/error.interface';
import { getPertemuanByKelasID } from '../../../data-repository/Pertemuan.data';
import { getPresensiByPertemuanUser } from '../../../data-repository/Presensi.data';

export async function getPertemuanByKelasLogic(
  data: getPertemuanByKelasInterface,
) {
  const kelas = await getKelasByID(data.kelasId);
  if (!kelas) {
    throw new NotFoundError('Kelas tidak ditemukan!');
  }

  const pertemuan = await getPertemuanByKelasID(kelas.id);

  if (data.asisten) {
    return pertemuan;
  } else {
    for (let i = 0; i < pertemuan.length; i++) {
      pertemuan[i].presensi = [
        await getPresensiByPertemuanUser(pertemuan[i].id, data.user.id),
      ];
    }
    return pertemuan;
  }
}

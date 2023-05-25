import { getKelasByID } from '../../../data-repository/Kelas.data';
import { getPertemuanByKelasInterface } from '../pertemuan.interface';
import {
  BadRequestError,
  NotFoundError,
} from '../../../framework/error.interface';
import { getPertemuanByKelasID } from '../../../data-repository/Pertemuan.data';
import { getPresensiByPertemuanUser } from '../../../data-repository/Presensi.data';
import { searchUserKelas } from '../../../data-repository/UserKelas.data';
import { getAsistenByKelas } from '../../../data-repository/KelasAsisten.data';

export async function getPertemuanByKelasLogic(
  data: getPertemuanByKelasInterface,
) {
  const kelas = await getKelasByID(data.kelasId);
  if (!kelas) {
    throw new NotFoundError('Kelas tidak ditemukan!');
  }
  let isOwned = false;
  const pertemuan = await getPertemuanByKelasID(kelas.id);

  const userKelas = await searchUserKelas(kelas.id, data.user.id);
  if (userKelas) {
    for (let i = 0; i < pertemuan.length; i++) {
      pertemuan[i].presensi = [
        await getPresensiByPertemuanUser(pertemuan[i].id, data.user.id),
      ];
    }
  } else {
    if (data.asisten) {
      const asistenKelas = await getAsistenByKelas(data.kelasId);
      for (let i = 0; i < asistenKelas.length; i++) {
        isOwned = asistenKelas[i].asisten.id === data.asisten.id;
        if (isOwned) {
          break;
        }
      }
      if (!isOwned) {
        throw new BadRequestError('Anda bukan pemilik kelas');
      }
    } else {
      throw new BadRequestError('Your request not authorized');
    }
  }

  return pertemuan;
}

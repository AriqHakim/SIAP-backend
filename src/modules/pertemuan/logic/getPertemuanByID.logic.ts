import { getPertemuanByID } from '../../../data-repository/Pertemuan.data';
import { getPertemuanByIDInterface } from '../pertemuan.interface';
import { Pertemuan } from '../../../entity/Pertemuan.entity';
import { PaginationResult } from '../../../framework/pagination.interface';
import { Presensi } from '../../../entity/Presensi.entity';
import {
  getPresensiByPertemuan,
  getPresensiByPertemuanUser,
} from '../../../data-repository/Presensi.data';
import { getAsistenByKelas } from '../../../data-repository/KelasAsisten.data';
import { BadRequestError } from '../../../framework/error.interface';
import { searchUserKelas } from '../../../data-repository/UserKelas.data';

export async function getPertemuanByIDLogic(data: getPertemuanByIDInterface) {
  const result: Pertemuan = await getPertemuanByID(data.id);
  let presensi: PaginationResult<Presensi> = {
    data: [],
    total_data: 0,
  };
  let isOwned = false;

  const userKelas = await searchUserKelas(data.kelasId, data.user.id);
  if (data.asisten) {
    if (!userKelas) {
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
      presensi = await getPresensiByPertemuan(data.id, data.limit, data.offset);
    } else {
      presensi.data = [await getPresensiByPertemuanUser(data.id, data.user.id)];
      presensi.total_data = presensi.data[0] ? 1 : 0;
    }
  } else {
    if (!userKelas) {
      throw new BadRequestError('Your request not authorized');
    }
    presensi.data = [await getPresensiByPertemuanUser(data.id, data.user.id)];
    presensi.total_data = presensi.data[0] ? 1 : 0;
  }

  return {
    data: result,
    presensi: presensi,
  };
}

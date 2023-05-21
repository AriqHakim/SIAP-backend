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

  if (data.asisten) {
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
    presensi = await getPresensiByPertemuan(data.id, data.limit, data.offset);
  } else {
    const userKelas = await searchUserKelas(data.kelasId, data.user.id);
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

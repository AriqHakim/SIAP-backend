import { getPertemuanByID } from '../../../data-repository/Pertemuan.data';
import { getPertemuanByIDInterface } from '../Pertemuan.interface';
import { Pertemuan } from '../../../entity/Pertemuan.entity';
import { PaginationResult } from '../../../framework/pagination.interface';
import { Presensi } from '../../../entity/Presensi.entity';
import {
  getPresensiByPertemuan,
  getPresensiByUserKelas,
} from '../../../data-repository/Presensi.data';

export async function getPertemuanByIDLogic(data: getPertemuanByIDInterface) {
  const result: Pertemuan = await getPertemuanByID(data.id);
  let presensi: PaginationResult<Presensi> = {
    data: [],
    total_data: 0,
  };

  if (data.asisten) {
    presensi = await getPresensiByPertemuan(data.id, data.limit, data.offset);
  } else {
    presensi.data = [await getPresensiByUserKelas(data.kelasId, data.user.id)];
    presensi.total_data = 1;
  }

  return {
    data: result,
    presensi: presensi,
  };
}

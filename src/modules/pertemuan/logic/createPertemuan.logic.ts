import { getKelasByID } from '../../../data-repository/Kelas.data';
import { createPertemuanInterface } from '../Pertemuan.interface';
import {
  BadRequestError,
  NotFoundError,
} from '../../../framework/error.interface';
import {
  getPertemuanByIndex,
  upsertPertemuan,
} from '../../../data-repository/Pertemuan.data';
import { Pertemuan } from '../../../entity/Pertemuan.entity';
import { DateTime } from 'luxon';
import { dateConverter } from '../../../framework/utils';
import { getUserKelasByKelasID } from '../../../data-repository/UserKelas.data';
import { upsertPresensi } from '../../../data-repository/Presensi.data';
import { Presensi, STATUS_KEHADIRAN } from '../../../entity/Presensi.entity';

export async function createPertemuanLogic(data: createPertemuanInterface) {
  const kelas = await getKelasByID(data.kelasId);
  if (!kelas) {
    throw new NotFoundError('Kelas tidak ditemukan!');
  }

  if (await getPertemuanByIndex(kelas.id, data.indexPertemuan)) {
    throw new BadRequestError('Pertemuan sudah dibuat');
  }

  const result = new Pertemuan();
  result.judul = data.judul;
  const date = DateTime.fromJSDate(data.startDate);
  result.startDate = data.startDate;
  result.endDate = dateConverter(
    date.plus({ hours: 2 }).toFormat('dd/MM/yyyy hh:mm:ss'),
  );
  result.indexPert = data.indexPertemuan;
  result.kelas = kelas;

  const pert = await upsertPertemuan(result);

  const users = await getUserKelasByKelasID(kelas.id);
  for (let i = 0; i < users.length; i++) {
    const temp = new Presensi();
    temp.bukti = null;
    temp.date = null;
    temp.status = STATUS_KEHADIRAN.TIDAK_HADIR;
    temp.isValidate = false;
    temp.pertemuan = pert;
    temp.user = users[i].user;
    await upsertPresensi(temp);
  }

  return pert;
}

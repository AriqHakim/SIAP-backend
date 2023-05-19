import { getKelasByID } from '../../../data-repository/Kelas.data';
import { createPertemuanInterface } from '../pertemuan.interface';
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
import { getAsistenByKelas } from '../../../data-repository/KelasAsisten.data';

export async function createPertemuanLogic(data: createPertemuanInterface) {
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

  return pert;
}

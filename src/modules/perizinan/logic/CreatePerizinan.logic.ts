import { createPerizinanInterface } from '../Perizinan.interface';
import { uploadToFirebase } from '../../../framework/MulterToFirebase';
import { Perizinan } from '../../../entity/Perizinan.entity';
import { getPertemuanByID } from '../../../data-repository/Pertemuan.data';
import { BadRequestError } from '../../../framework/error.interface';
import { getKelasByID } from '../../../data-repository/Kelas.data';
import { upsertPerizinan } from '../../../data-repository/Perizinan.data';
import { upsertPresensi } from '../../../data-repository/Presensi.data';
import { Presensi } from '../../../entity/Presensi.entity';

export async function createPerizinanLogic(data: createPerizinanInterface) {
  const kelas = await getKelasByID(data.kelasId);
  if (!kelas) {
    throw new BadRequestError('kelas tidak ditemukan!');
  }
  const pertemuan = await getPertemuanByID(data.pertemuanId);
  if (!pertemuan) {
    throw new BadRequestError('pertemuan tidak ditemukan!');
  }

  const img = await uploadToFirebase(data.file, 'kehadiran');

  const perizinan = new Perizinan();
  perizinan.bukti = img;

  const today = Date.now();
  const currDay = new Date(today);

  perizinan.date = currDay;
  perizinan.status = data.status;
  perizinan.user = data.user;
  perizinan.pertemuan = pertemuan;

  const result = await upsertPerizinan(perizinan);

  const presensi = new Presensi();
  presensi.status = data.status;
  presensi.bukti = perizinan.bukti;
  presensi.date = currDay;
  presensi.isValidate = false;
  presensi.user = data.user;
  presensi.pertemuan = pertemuan;
  await upsertPresensi(presensi);

  return result instanceof Perizinan;
}

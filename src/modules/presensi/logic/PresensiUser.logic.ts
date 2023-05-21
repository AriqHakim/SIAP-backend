import { BadRequestError } from '../../../framework/error.interface';
import { PresensiUserInterface } from '../Presensi.interface';
import { getKelasByID } from '../../../data-repository/Kelas.data';
import { getPertemuanByID } from '../../../data-repository/Pertemuan.data';
import {
  getPresensiByPertemuanUser,
  upsertPresensi,
} from '../../../data-repository/Presensi.data';
import { uploadToFirebase } from '../../../framework/MulterToFirebase';
import { Presensi, STATUS_KEHADIRAN } from '../../../entity/Presensi.entity';
import { searchUserKelas } from '../../../data-repository/UserKelas.data';

export async function presensiUserLogic(data: PresensiUserInterface) {
  const kelas = await getKelasByID(data.kelasId);
  if (!kelas) {
    throw new BadRequestError('kelas tidak ditemukan!');
  }

  const userKelas = await searchUserKelas(data.kelasId, data.user.id);
  if (!userKelas) {
    throw new BadRequestError('Your request not authorized');
  }

  const pertemuan = await getPertemuanByID(data.pertemuanId);
  if (!pertemuan) {
    throw new BadRequestError('pertemuan tidak ditemukan!');
  }

  const isPresensi = await getPresensiByPertemuanUser(
    data.pertemuanId,
    data.user.id,
  );

  if (isPresensi) {
    throw new BadRequestError('Anda sudah melakukan absensi');
  }

  const presensi = new Presensi();

  presensi.user = data.user;
  presensi.pertemuan = pertemuan;
  presensi.isValidate = false;

  const today = Date.now();
  const currDay = new Date(today);

  presensi.date = currDay;

  const bukti = await uploadToFirebase(data.file, 'bukti');
  presensi.bukti = bukti;

  presensi.status = STATUS_KEHADIRAN.HADIR;

  return (await upsertPresensi(presensi)) instanceof Presensi;
}

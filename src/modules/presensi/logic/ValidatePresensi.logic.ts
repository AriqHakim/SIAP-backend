import {
  BadRequestError,
  NotFoundError,
} from '../../../framework/error.interface';
import { getAsistenByKelas } from '../../../data-repository/KelasAsisten.data';
import { upsertPresensi } from '../../../data-repository/Presensi.data';
import { Presensi } from '../../../entity/Presensi.entity';
import { PresensiByIdInterface } from '../Presensi.interface';
import { getPresensiByIDLogic } from './GetPresensiByID.logic';
import { getKelasByID } from '../../../data-repository/Kelas.data';

export async function validatePresensiLogic(data: PresensiByIdInterface) {
  const kelas = await getKelasByID(data.kelasId);
  if (!kelas) {
    throw new NotFoundError('Kelas tidak ditemukan!');
  }
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
  const presensi = await getPresensiByIDLogic(data);
  presensi.isValidate = true;
  const result = await upsertPresensi(presensi);
  return result instanceof Presensi;
}

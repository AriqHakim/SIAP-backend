import { upsertPresensi } from '../../../data-repository/Presensi.data';
import { Presensi } from '../../../entity/Presensi.entity';
import { PresensiByIdInterface } from '../Presensi.interface';
import { getPresensiByIDLogic } from './GetPresensiByID.logic';

export async function validatePresensiLogic(data: PresensiByIdInterface) {
  const presensi = await getPresensiByIDLogic(data);
  presensi.isValidate = true;
  const result = await upsertPresensi(presensi);
  return result instanceof Presensi;
}

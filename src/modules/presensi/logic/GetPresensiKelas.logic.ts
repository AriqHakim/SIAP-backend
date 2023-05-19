import { BadRequestError } from '../../../framework/error.interface';
import { GetPresensiKelasInterface } from '../Presensi.interface';
import { getKelasByID } from '../../../data-repository/Kelas.data';
import { searchUserKelas } from '../../../data-repository/UserKelas.data';
import { getPresensiByUserKelas } from '../../../data-repository/Presensi.data';

export async function getPresensiKelasLogic(data: GetPresensiKelasInterface) {
  const kelas = await getKelasByID(data.kelasId);
  if (!kelas) {
    throw new BadRequestError('kelas tidak ditemukan!');
  }

  const userKelas = await searchUserKelas(data.kelasId, data.user.id);
  if (!userKelas) {
    throw new BadRequestError('Your request not authorized');
  }

  return await getPresensiByUserKelas(data.kelasId, data.user.id);
}

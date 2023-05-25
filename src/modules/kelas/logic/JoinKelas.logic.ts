import { UserKelas } from '../../../entity/UserKelas.entity';
import { getKelasByKode } from '../../../data-repository/Kelas.data';
import { JoinKelasInterface } from '../Kelas.interface';
import {
  BadRequestError,
  NotFoundError,
} from '../../../framework/error.interface';
import {
  searchUserKelas,
  upsertUserKelas,
} from '../../../data-repository/UserKelas.data';
import { getAsistenByKelas } from '../../../data-repository/KelasAsisten.data';

export async function joinKelasLogic(data: JoinKelasInterface) {
  const kelas = await getKelasByKode(data.kode);
  let isOwned = false;
  if (!kelas) {
    throw new NotFoundError('Kelas tidak ditemukan');
  }

  if (await searchUserKelas(kelas.id, data.user.id)) {
    throw new BadRequestError('Anda sudah join kelas ini');
  }

  if (data.asisten) {
    const asistenKelas = await getAsistenByKelas(kelas.id);
    for (let i = 0; i < asistenKelas.length; i++) {
      isOwned = asistenKelas[i].asisten.id === data.asisten.id;
      if (isOwned) {
        break;
      }
    }
    if (isOwned) {
      throw new BadRequestError('Anda pemilik kelas!');
    }
  }

  const userKelas = new UserKelas();
  userKelas.user = data.user;
  userKelas.kelas = kelas;

  return (await upsertUserKelas(userKelas)) instanceof UserKelas;
}

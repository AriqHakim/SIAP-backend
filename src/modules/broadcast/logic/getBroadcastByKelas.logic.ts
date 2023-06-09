import { getKelasByID } from '../../../data-repository/Kelas.data';
import { getBroadcastByKelasInterface } from '../Broadcast.interface';
import {
  BadRequestError,
  NotFoundError,
} from '../../../framework/error.interface';
import { getBroadcastByKelasID } from '../../../data-repository/Broadcast.data';
import { searchUserKelas } from '../../../data-repository/UserKelas.data';
import { getAsistenByKelas } from '../../../data-repository/KelasAsisten.data';

export async function getBroadcastByKelasLogic(
  data: getBroadcastByKelasInterface,
) {
  const kelas = await getKelasByID(data.kelasId);
  if (!kelas) {
    throw new NotFoundError('Kelas tidak ditemukan');
  }

  const userKelas = await searchUserKelas(data.kelasId, data.user.id);
  if (!data.asisten) {
    if (!userKelas) {
      throw new BadRequestError('Your request not authorized');
    }
  } else {
    const asistenKelas = await getAsistenByKelas(data.kelasId);
    let isOwned = false;
    for (let i = 0; i < asistenKelas.length; i++) {
      isOwned = asistenKelas[i].asisten.id === data.asisten.id;
      if (isOwned) {
        break;
      }
    }
    if (!isOwned && !userKelas) {
      throw new BadRequestError('Anda bukan pemilik kelas');
    }
  }

  return await getBroadcastByKelasID(kelas.id);
}

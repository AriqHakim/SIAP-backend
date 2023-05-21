import { getAsistenByKelas } from '../../../data-repository/KelasAsisten.data';
import { deleteBroadcastByIDInterface } from '../Broadcast.interface';
import {
  BadRequestError,
  NotFoundError,
} from '../../../framework/error.interface';
import { getKelasByID } from '../../../data-repository/Kelas.data';
import { deleteBroadcastByID } from '../../../data-repository/Broadcast.data';

export async function deleteBroadcastByIDLogic(
  data: deleteBroadcastByIDInterface,
) {
  const kelas = await getKelasByID(data.kelasId);
  if (!kelas) {
    throw new NotFoundError('Kelas tidak ditemukan');
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

  const result = await deleteBroadcastByID(data.broadcastId);

  return result.affected === 1;
}

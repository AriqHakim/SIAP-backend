import { BadRequestError } from '../../../framework/error.interface';
import { searchUserKelas } from '../../../data-repository/UserKelas.data';
import { GetKelasByIDInterface } from '../Kelas.interface';
import { getAsistenByKelas } from '../../../data-repository/KelasAsisten.data';
import { getKelasByIDwithAsisten } from '../../../data-repository/Kelas.data';

export async function getKelasByIDLogic(data: GetKelasByIDInterface) {
  if (!data.asisten) {
    const userKelas = await searchUserKelas(data.kelasId, data.user.id);
    if (!userKelas) {
      throw new BadRequestError('Your request not authorized');
    }
  } else {
    const asistenKelas = await getAsistenByKelas(data.kelasId);
    let isOwned = false;
    for (let i = 0; i < asistenKelas.length; i++) {
      isOwned = asistenKelas[i].asisten.id === data.asisten.id;
    }
    if (!isOwned) {
      throw new BadRequestError('Anda bukan pemilik kelas');
    }
  }

  const kelas = await getKelasByIDwithAsisten(data.kelasId);

  return {
    kelas: kelas,
    isAsisten: data.asisten !== null,
  };
}

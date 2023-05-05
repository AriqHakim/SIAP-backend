import { randomString } from '../../../framework/utils';
import { Kelas } from '../../../entity/Kelas.entity';
import { CreateKelasInterface } from '../Kelas.interface';
import {
  getKelasByKode,
  upsertKelas,
} from '../../../data-repository/Kelas.data';
import { upsertKelasAsisten } from '../../../data-repository/KelasAsisten.data';
import { KelasAsisten } from '../../../entity/KelasAsisten.entity';

export async function CreateKelasLogic(data: CreateKelasInterface) {
  const kelas: Kelas = new Kelas();
  kelas.judul = data.judul;
  kelas.deskripsi = data.deskripsi;
  let tempKelas: Kelas = null;

  let kodeFlag = true;
  while (kodeFlag) {
    kelas.kode = randomString(6);
    tempKelas = await getKelasByKode(kelas.kode);
    if (!tempKelas) {
      kodeFlag = false;
      break;
    }
  }

  await upsertKelas(kelas);
  const asisten = [data.asisten, ...data.otherAsisten];
  asisten.forEach(async (value) => {
    const asistenKelas = new KelasAsisten();
    asistenKelas.asisten = value;
    asistenKelas.kelas = kelas;
    await upsertKelasAsisten(asistenKelas);
  });

  return kelas instanceof Kelas;
}

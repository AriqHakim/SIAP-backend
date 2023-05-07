import { randomString } from '../../../framework/utils';
import { Kelas } from '../../../entity/Kelas.entity';
import { CreateKelasInterface } from '../Kelas.interface';
import {
  getKelasByJudul,
  getKelasByKode,
  upsertKelas,
} from '../../../data-repository/Kelas.data';
import { upsertKelasAsisten } from '../../../data-repository/KelasAsisten.data';
import { KelasAsisten } from '../../../entity/KelasAsisten.entity';
import { getAsistenByID } from '../../../data-repository/AsistenPraktikum.data';
import { BadRequestError } from '../../../framework/error.interface';

export async function CreateKelasLogic(data: CreateKelasInterface) {
  const kelas: Kelas = new Kelas();
  kelas.judul = data.judul;
  kelas.deskripsi = data.deskripsi;

  const checkName = await getKelasByJudul(kelas.judul);
  if (checkName) {
    throw new BadRequestError('Nama kelas sudah dipakai!');
  }

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

  const asisten = [data.asisten, ...data.otherAsisten];

  for (let i = 0; i < asisten.length; i++) {
    const temp = await getAsistenByID(asisten[i].id);
    if (!temp) {
      throw new BadRequestError('Asisten tidak terdaftar');
    }
  }

  await upsertKelas(kelas);

  for (let i = 0; i < asisten.length; i++) {
    const asistenKelas = new KelasAsisten();
    asistenKelas.asisten = asisten[i];
    asistenKelas.kelas = kelas;
    await upsertKelasAsisten(asistenKelas);
  }

  return kelas instanceof Kelas;
}

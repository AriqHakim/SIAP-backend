import { upsertBroadcast } from '../../../data-repository/Broadcast.data';
import { createBroadcastInterface } from '../Broadcast.interface';
import { Broadcast } from '../../../entity/Broadcast.entity';
import { getKelasByID } from '../../../data-repository/Kelas.data';
import {
  BadRequestError,
  NotFoundError,
} from '../../../framework/error.interface';
import { Attachment } from '../../../entity/Attachment.entity';
import { upsertAttachment } from '../../../data-repository/Attachment.data';
import { getAsistenByKelas } from '../../../data-repository/KelasAsisten.data';

export async function createBroadcastLogic(data: createBroadcastInterface) {
  const kelas = await getKelasByID(data.kelasId);
  if (!kelas) {
    throw new NotFoundError('Kelas tidak ditemukan');
  }

  const asistenKelas = await getAsistenByKelas(kelas.id);
  let isOwned = false;
  for (let i = 0; i < asistenKelas.length; i++) {
    isOwned = asistenKelas[i].asisten.id === data.asisten.id;
  }
  if (!isOwned) {
    throw new BadRequestError('Anda bukan pemilik kelas');
  }

  const broadcast = new Broadcast();
  broadcast.judul = data.judul;
  broadcast.deskripsi = data.deskripsi;
  broadcast.date = data.date;
  broadcast.owner = data.asisten;

  const result = await upsertBroadcast(broadcast);

  for (let i = 0; i < data.attachments.length; i++) {
    const temp = new Attachment();
    temp.judul = data.attachments[i].judul;
    temp.url = data.attachments[i].url;
    temp.broadcast = broadcast;
    await upsertAttachment(temp);
  }
  return result instanceof Broadcast;
}

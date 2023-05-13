import { upsertBroadcast } from '../../../data-repository/Broadcast.data';
import { createBroadcastInterface } from '../Broadcast.interface';
import { Broadcast } from '../../../entity/Broadcast.entity';
import { getKelasByID } from '../../../data-repository/Kelas.data';
import {
  BadRequestError,
  NotFoundError,
} from '../../../framework/error.interface';
import { getAsistenByID } from '../../../data-repository/AsistenPraktikum.data';
import { Attachment } from '../../../entity/Attachment.entity';
import { upsertAttachment } from '../../../data-repository/Attachment.data';

export async function createBroadcastLogic(data: createBroadcastInterface) {
  const kelas = await getKelasByID(data.kelasId);
  if (!kelas) {
    throw new NotFoundError('Kelas tidak ditemukan');
  }

  const asisten = await getAsistenByID(data.asisten.id);
  if (!asisten) {
    throw new BadRequestError('Your request not authorized!');
  }

  const broadcast = new Broadcast();
  broadcast.judul = data.judul;
  broadcast.deskripsi = data.deskripsi;
  broadcast.date = data.date;
  broadcast.owner = asisten;

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

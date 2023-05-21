import { AsistenPraktikum } from '../../entity/AsistenPraktikum.entity';
import { Attachment } from '../../entity/Attachment.entity';
import { User } from '../../entity/User.entity';

export class createBroadcastInterface {
  user: User;
  asisten: AsistenPraktikum;
  judul: string;
  deskripsi: string;
  date: Date;
  attachments: Attachment[];
  kelasId: string;
}

export class getBroadcastByKelasInterface {
  user: User;
  asisten: AsistenPraktikum;
  kelasId: string;
}

export class deleteBroadcastByIDInterface {
  user: User;
  asisten: AsistenPraktikum;
  kelasId: string;
  broadcastId: string;
}

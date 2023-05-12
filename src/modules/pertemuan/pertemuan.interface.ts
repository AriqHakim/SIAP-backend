import { AsistenPraktikum } from '../../entity/AsistenPraktikum.entity';
import { User } from '../../entity/User.entity';

export class createPertemuanInterface {
  user: User;
  asisten: AsistenPraktikum;
  kelasId: string;
  indexPertemuan: number;
  judul: string;
  startDate: Date;
}

export class getPertemuanByIDInterface {
  user: User;
  asisten: AsistenPraktikum;
  kelasId: string;
  id: string;
  limit: number;
  offset: number;
}

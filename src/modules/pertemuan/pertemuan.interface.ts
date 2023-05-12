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

import { AsistenPraktikum } from '../../entity/AsistenPraktikum.entity';
import { User } from '../../entity/User.entity';

export class createPertemuanInterface {
  user: User;
  asisten: AsistenPraktikum;
  kelasId: string;
  indexPert: number;
  judul: string;
  startDate: Date;
}

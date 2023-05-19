import { AsistenPraktikum } from '../../entity/AsistenPraktikum.entity';
import { User } from '../../entity/User.entity';

export class PresensiUserInterface {
  user: User;
  pertemuanId: string;
  kelasId: string;
  file: Express.Multer.File;
}

export class GetPresensiByPertemuan {
  user: User;
  asisten: AsistenPraktikum;
  pertemuanId: string;
  kelasId: string;
}

import { AsistenPraktikum } from 'src/entity/AsistenPraktikum.entity';
import { User } from '../../entity/User.entity';

export class PresensiUserInterface {
  user: User;
  pertemuanId: string;
  kelasId: string;
  file: Express.Multer.File;
}

export class GetPresensiKelasInterface {
  user: User;
  kelasId: string;
}

export class PresensiByIdInterface {
  user: User;
  asisten: AsistenPraktikum;
  pertemuanId: string;
  kelasId: string;
  presensiId: string;
}

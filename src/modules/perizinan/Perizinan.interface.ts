import { STATUS_KEHADIRAN } from 'src/entity/Presensi.entity';
import { User } from 'src/entity/User.entity';

export class createPerizinanInterface {
  user: User;
  kelasId: string;
  pertemuanId: string;
  status: STATUS_KEHADIRAN;
  file: Express.Multer.File;
}

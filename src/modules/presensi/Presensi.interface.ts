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

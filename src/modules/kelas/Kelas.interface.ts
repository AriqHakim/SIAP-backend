import { AsistenPraktikum } from '../../entity/AsistenPraktikum.entity';
import { User } from '../../entity/User.entity';

export class GetAllKelasInterface {
  user: User;
  asisten?: AsistenPraktikum;
}

export class CreateKelasInterface {
  user: User;
  asisten: AsistenPraktikum;
  judul: string;
  deskripsi: string;
  otherAsisten: AsistenPraktikum[];
}

export class JoinKelasInterface {
  user: User;
  kode: string;
}

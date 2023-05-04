import { AsistenPraktikum } from '../../entity/AsistenPraktikum.entity';
import { User } from '../../entity/User.entity';

export class GetAllKelasInterface {
  user: User;
  asisten?: AsistenPraktikum;
}

export class CreateKelasInterface {
  user: User;
  asisten: AsistenPraktikum;
  nama: string;
  deskripsi: string;
  OtherUser: User[];
}

import { AsistenPraktikum } from '../../entity/AsistenPraktikum.entity';
import { User } from '../../entity/User.entity';

export class GetAllKelasInterface {
  user: User;
  asisten?: AsistenPraktikum;
}

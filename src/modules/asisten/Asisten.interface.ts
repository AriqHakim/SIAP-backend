import { AsistenPraktikum } from '../../entity/AsistenPraktikum.entity';
import { User } from '../../entity/User.entity';

export class GetAsistenInterface {
  user: User;
  asisten: AsistenPraktikum;
  offset: number;
  limit: number;
  q?: string;
}

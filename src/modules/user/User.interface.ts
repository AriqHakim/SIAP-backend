import { User } from 'src/entity/User.entity';

export class GetUserByIDInterface {
  user: User;
  id: string;
}

export class GetUsersInterface {
  user: User;
  offset: number;
  limit: number;
  q?: string;
}

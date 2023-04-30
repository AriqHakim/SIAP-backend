import { User } from '../../../entity/User.entity';
import { LoginInterface } from '../Auth.interface';
import * as UserData from '../../data-repository/User.data';
import { getAsistenByUserID } from '../../data-repository/Asisten.data';
import bcrypt from 'bcrypt';
import { BadRequestError } from '../../../framework/error.interface';
import { signJWT } from './../../../jwt.config';
import { AsistenPraktikum } from '../../../entity/AsistenPraktikum.entity';

export async function loginUserLogic(data: LoginInterface) {
  const user: User = await UserData.getUserByEmail(data.email);

  if (!user) {
    throw new BadRequestError(`Email ${data.email} is not found!`);
  }

  if (!bcrypt.compareSync(data.password, user.password)) {
    throw new BadRequestError("Password doesn't match!");
  }

  const asisten: AsistenPraktikum = await getAsistenByUserID(user.id);
  delete user.password;

  return {
    access_token: signJWT({
      id: user.id,
    }),
    user,
    asisten,
  };
}

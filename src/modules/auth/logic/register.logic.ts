import { User } from '../../../entity/User.entity';
import { RegisterInterface } from '../Auth.interface';
import * as UserData from './../User.data';
import bcrypt from 'bcrypt';
import { BadRequestError } from '../../../framework/error.interface';

export async function registerUser(data: RegisterInterface): Promise<User> {
  if (data.password != data.confirmPassword) {
    throw new BadRequestError("Password doesn't match!");
  }

  const saltRound = 10;
  const encryptedPass = await bcrypt.hash(data.password, saltRound);

  const user: User = new User();

  user.email = data.email;
  user.password = encryptedPass;
  user.name = data.name;
  user.npm = data.npm;
  user.noTelp = data.noTelp;

  return await UserData.upsertUser(user);
}

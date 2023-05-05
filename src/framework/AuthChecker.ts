import { AsistenPraktikum } from '../entity/AsistenPraktikum.entity';
import { User } from '../entity/User.entity';
import { Admin } from '../entity/Admin.entity';
import { jwt_config_admin, jwt_config_user } from '../jwt.config';
import { UnauthorizedError } from './error.interface';
import { extractDataFromJWT } from './JWTExtractor';

export async function adminChecker(header: string) {
  if (!header) {
    throw new UnauthorizedError(`Your request is unauthorized`);
  }

  return (await extractDataFromJWT(jwt_config_admin, header)) as Admin;
}

export async function userChecker(header: string) {
  if (!header) {
    throw new UnauthorizedError(`Your request is unauthorized`);
  }

  const auth = (await extractDataFromJWT(jwt_config_user, header)) as {
    user: User;
    asisten: AsistenPraktikum;
  };

  if (!auth.user) {
    throw new UnauthorizedError(`Your request is unauthorized`);
  }

  return auth;
}

export async function asistenChecker(header: string) {
  const auth = await userChecker(header);

  if (!auth.asisten) {
    throw new UnauthorizedError(`Your request is unauthorized`);
  }

  return auth;
}

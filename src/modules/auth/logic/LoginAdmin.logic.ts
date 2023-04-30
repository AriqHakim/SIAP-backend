import { Admin } from '../../../entity/Admin.entity';
import { LoginInterface } from '../Auth.interface';
import * as AdminData from '../../data-repository/Admin.data';
import { BadRequestError } from '../../../framework/error.interface';
import { signJWT } from './../../../jwt.config';

export async function loginAdminLogic(data: LoginInterface) {
  const admin: Admin = await AdminData.getAdminByEmail(data.email);

  if (!admin) {
    throw new BadRequestError(`Email ${data.email} is not found!`);
  }

  if (data.password != admin.password) {
    throw new BadRequestError("Password doesn't match!");
  }

  delete admin.password;

  return {
    access_token: signJWT({
      id: admin.id,
    }),
    admin,
  };
}

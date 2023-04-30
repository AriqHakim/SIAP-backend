import AppDataSource from '../../orm.config';
import { Admin } from '../../entity/Admin.entity';

export async function getAdminByEmail(email: string) {
  return await AppDataSource.getRepository(Admin).findOne({
    where: {
      email: email,
    },
  });
}

export async function getAdminByID(id: string) {
  return await AppDataSource.getRepository(Admin).findOne({
    where: {
      id: id,
    },
  });
}

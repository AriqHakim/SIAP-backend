import AppDataSource from '../orm.config';
import { Admin } from '../entity/Admin.entity';

const repository = AppDataSource.getRepository(Admin);

export async function getAdminByEmail(email: string) {
  return await repository.findOne({
    where: {
      email: email,
    },
  });
}

export async function getAdminByID(id: string) {
  return await repository.findOne({
    where: {
      id: id,
    },
  });
}

import AppDataSource from '../orm.config';
import { RoleApproval } from '../entity/RoleApproval.entity';

const repository = AppDataSource.getRepository(RoleApproval);

export async function upsertApproval(approval: RoleApproval) {
  return await repository.save(approval);
}

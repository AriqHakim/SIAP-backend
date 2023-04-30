import AppDataSource from '../../orm.config';
import { RoleApproval } from '../../entity/RoleApproval.entity';

export async function upsertApproval(approval: RoleApproval) {
  return await AppDataSource.getRepository(RoleApproval).save(approval);
}

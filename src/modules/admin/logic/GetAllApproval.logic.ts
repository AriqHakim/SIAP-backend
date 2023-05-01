import { getAllApprovals } from '../../../data-repository/RoleApproval.data';
import { GetAllApprovalInterface } from '../Admin.interface';

export async function getAllApprovalLogic(data: GetAllApprovalInterface) {
  data.limit = data.limit ?? 10;
  data.offset = data.offset ?? 0;
  return await getAllApprovals(data.offset, data.limit);
}

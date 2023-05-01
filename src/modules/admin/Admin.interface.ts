import { Admin } from '../../entity/Admin.entity';

export class GetAllApprovalInterface {
  admin: Admin;
  offset: number;
  limit: number;
}

export class ApprovalInterface {
  admin: Admin;
  id: string;
}

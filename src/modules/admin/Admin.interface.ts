import { Admin } from '../../entity/Admin.entity';

export class GetAllApprovalInterface {
  admin: Admin;
  offset: number;
  limit: number;
}

export class AcceptApprovalInterface {
  admin: Admin;
  id: string;
}

export class RejectApprovalInterface {
  admin: Admin;
  id: string;
}

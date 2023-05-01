import {
  BadRequestError,
  NotFoundError,
} from '../../../framework/error.interface';
import { ApprovalInterface } from '../Admin.interface';
import {
  getApprovalByID,
  upsertApproval,
} from '../../../data-repository/RoleApproval.data';
import { STATUS_APPROVAL } from '../../../entity/RoleApproval.entity';
import { AsistenPraktikum } from '../../../entity/AsistenPraktikum.entity';
import { upsertAsisten } from '../../../data-repository/AsistenPraktikum.data';

export async function acceptApprovalLogic(data: ApprovalInterface) {
  if (data.id === null || data.id === undefined) {
    throw new BadRequestError('Id can not be null or undefined');
  }

  const approval = await getApprovalByID(data.id);

  if (!approval) {
    throw new NotFoundError(`Approval with id: ${data.id} not found`);
  }

  if (approval.status !== STATUS_APPROVAL.PENDING) {
    throw new BadRequestError('Approval already accepted or rejected');
  }
  approval.status = STATUS_APPROVAL.ACCEPTED;

  await upsertApproval(approval);

  const asisten: AsistenPraktikum = new AsistenPraktikum();
  asisten.instansi = '';
  asisten.user = approval.user;

  await upsertAsisten(asisten);

  return true;
}

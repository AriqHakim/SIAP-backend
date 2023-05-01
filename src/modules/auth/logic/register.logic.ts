import { User } from '../../../entity/User.entity';
import { RoleApproval } from '../../../entity/RoleApproval.entity';
import { STATUS_APPROVAL } from '../../../entity/RoleApproval.entity';
import { RegisterInterface } from '../Auth.interface';
import { BadRequestError } from '../../../framework/error.interface';
import { upsertUser } from '../../../data-repository/User.data';
import { upsertApproval } from '../../../data-repository/RoleApproval.data';
import bcrypt from 'bcrypt';

export async function registerUser(data: RegisterInterface): Promise<boolean> {
  if (data.password != data.confirmPassword) {
    throw new BadRequestError("Password doesn't match!");
  }

  const saltRound = 10;
  const encryptedPass = await bcrypt.hash(data.password, saltRound);

  const user: User = new User();

  user.email = data.email;
  user.password = encryptedPass;
  user.name = data.name;
  user.npm = data.npm;
  user.noTelp = data.noTelp;

  if (data.isAsisten) {
    const approval = new RoleApproval();
    approval.user = user;
    approval.status = STATUS_APPROVAL.PENDING;

    await upsertApproval(approval);
  }

  return (await upsertUser(user)) instanceof User;
}

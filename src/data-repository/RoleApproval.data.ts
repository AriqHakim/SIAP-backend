import AppDataSource from '../orm.config';
import { RoleApproval } from '../entity/RoleApproval.entity';
import { FindManyOptions } from 'typeorm';
import { countTotalData } from '../framework/utils';

const repository = AppDataSource.getRepository(RoleApproval);

export async function upsertApproval(approval: RoleApproval) {
  return await repository.save(approval);
}

export async function getAllApprovals(offset: number, limit: number) {
  const options: FindManyOptions<RoleApproval> = {
    select: {
      id: true,
      status: true,
      user: {
        id: true,
        email: true,
        password: false,
        name: true,
        npm: true,
        noTelp: true,
      },
    },
    take: limit,
    skip: offset,
  };
  return {
    data: await repository.find({
      ...options,
      relations: ['user'],
    }),
    total_data: await countTotalData(RoleApproval, options),
  };
}

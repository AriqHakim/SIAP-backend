import { Request, Response } from 'express';
import { GetAllApprovalInterface } from '../Admin.interface';
import { getAllApprovalLogic } from '../logic/GetAllApproval.logic';
import { parseQueryToInt } from '../../../framework/utils';
import { ResponseBody } from '../../../framework/response.interface';
import { RoleApproval } from '../../../entity/RoleApproval.entity';
import { PaginationResult } from '../../../framework/pagination.interface';
import { adminChecker } from '../../../framework/AuthChecker';

export async function getAllApproval(req: Request, res: Response) {
  try {
    const data: GetAllApprovalInterface = new GetAllApprovalInterface();

    data.admin = await adminChecker(req.headers['authorization'] as string);

    data.offset = parseQueryToInt(req.query, 'offset');
    data.limit = parseQueryToInt(req.query, 'limit');

    const approvals = await getAllApprovalLogic(data);

    const result: ResponseBody<PaginationResult<RoleApproval>> = {
      status: 200,
      message: 'Fetch All Approval Data successfull',
      data: approvals,
    };

    res.send(result);
    return result;
  } catch (error) {
    const result: ResponseBody<{ success: boolean }> = {
      status: error.code,
      message: error.message,
      data: {
        success: false,
      },
    };

    res.send(result);
    return result;
  }
}

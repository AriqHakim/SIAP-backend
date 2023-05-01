import { Request, Response } from 'express';
import { GetAllApprovalInterface } from '../Admin.interface';
import { extractDataFromJWT } from '../../../framework/JWTExtractor';
import { jwt_config_admin } from '../../../jwt.config';
import { getAllApprovalLogic } from '../logic/GetAllApproval.logic';
import { Admin } from '../../../entity/Admin.entity';
import { parseQueryToInt } from '../../../framework/utils';
import { UnauthorizedError } from '../../../framework/error.interface';
import { ResponseBody } from '../../../framework/response.interface';
import { RoleApproval } from '../../../entity/RoleApproval.entity';
import { PaginationResult } from '../../../framework/pagination.interface';

export async function getAllApproval(req: Request, res: Response) {
  try {
    const data: GetAllApprovalInterface = new GetAllApprovalInterface();

    if (!req.headers['authorization']) {
      throw new UnauthorizedError(`Your request is unauthorized`);
    }

    data.admin = (await extractDataFromJWT(
      jwt_config_admin,
      req.headers['authorization'] as string,
    )) as Admin;

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

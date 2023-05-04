import { Admin } from '../../../entity/Admin.entity';
import { ApprovalInterface } from '../Admin.interface';
import { UnauthorizedError } from '../../../framework/error.interface';
import { extractDataFromJWT } from '../../../framework/JWTExtractor';
import { jwt_config_admin } from '../../../jwt.config';
import { Request, Response } from 'express';
import { rejectApprovalLogic } from '../logic/RejectApproval.logic';
import { ResponseBody } from '../../../framework/response.interface';

export async function rejectApproval(req: Request, res: Response) {
  try {
    const data: ApprovalInterface = new ApprovalInterface();

    if (!req.headers['authorization']) {
      throw new UnauthorizedError(`Your request is unauthorized`);
    }

    data.admin = (await extractDataFromJWT(
      jwt_config_admin,
      req.headers['authorization'] as string,
    )) as Admin;

    data.id = req.params.id;

    await rejectApprovalLogic(data);
    const result: ResponseBody<{ success: boolean }> = {
      status: 201,
      message: 'Approval has been rejected',
      data: {
        success: true,
      },
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

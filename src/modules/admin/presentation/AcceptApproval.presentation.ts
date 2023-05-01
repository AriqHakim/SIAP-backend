import { Admin } from '../../../entity/Admin.entity';
import { AcceptApprovalInterface } from '../Admin.interface';
import { UnauthorizedError } from '../../../framework/error.interface';
import { extractDataFromJWT } from '../../../framework/JWTExtractor';
import { jwt_config_admin } from '../../../jwt.config';
import { Request, Response } from 'express';
import { acceptApprovallogic } from '../logic/AcceptApproval.logic';
import { ResponseBody } from '../../../framework/response.interface';

export async function acceptApproval(req: Request, res: Response) {
  try {
    const data: AcceptApprovalInterface = new AcceptApprovalInterface();

    if (!req.headers['authorization']) {
      throw new UnauthorizedError(`Your request is unauthorized`);
    }

    data.admin = (await extractDataFromJWT(
      jwt_config_admin,
      req.headers['authorization'] as string,
    )) as Admin;

    data.id = req.params.id;

    await acceptApprovallogic(data);
    const result: ResponseBody<boolean> = {
      status: 201,
      message: 'Approval has beed accepted',
      data: true,
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

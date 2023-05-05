import { ApprovalInterface } from '../Admin.interface';
import { Request, Response } from 'express';
import { acceptApprovalLogic } from '../logic/AcceptApproval.logic';
import { ResponseBody } from '../../../framework/response.interface';
import { adminChecker } from '../../../framework/AuthChecker';

export async function acceptApproval(req: Request, res: Response) {
  try {
    const data: ApprovalInterface = new ApprovalInterface();

    data.admin = await adminChecker(req.headers['authorization'] as string);

    data.id = req.params.id;

    await acceptApprovalLogic(data);
    const result: ResponseBody<{ success: boolean }> = {
      status: 201,
      message: 'Approval has been accepted',
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

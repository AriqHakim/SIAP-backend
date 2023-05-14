import { Request, Response } from 'express';
import { GetUserByIDInterface } from '../User.interface';
import { userChecker } from '../../../framework/AuthChecker';
import { ResponseBody } from '../../../framework/response.interface';
import { User } from '../../../entity/User.entity';
import { getUserByIDLogic } from '../logic/GetUserByID.logic';

export async function getUserByID(req: Request, res: Response) {
  try {
    const data: GetUserByIDInterface = new GetUserByIDInterface();

    const auth = await userChecker(req.headers['authorization']);

    data.user = auth.user;
    data.id = req.params.id;

    const result: ResponseBody<User> = {
      status: 200,
      message: 'Data successfully fetched',
      data: await getUserByIDLogic(data.id),
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

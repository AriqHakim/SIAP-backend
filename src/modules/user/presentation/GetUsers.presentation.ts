import { User } from '../../../entity/User.entity';
import { GetUsersInterface } from '../User.interface';
import { userChecker } from '../../../framework/AuthChecker';
import { parseQueryToInt } from '../../../framework/utils';
import { ResponseBody } from '../../../framework/response.interface';
import { PaginationResult } from '../../../framework/pagination.interface';
import { Request, Response } from 'express';
import { getUsersLogic } from '../logic/GetUsers.logic';

export async function getUsers(req: Request, res: Response) {
  try {
    const data: GetUsersInterface = new GetUsersInterface();

    const auth = await userChecker(req.headers['authorization'] as string);

    data.user = auth.user;
    data.offset = parseQueryToInt(req.query, 'offset');
    data.limit = parseQueryToInt(req.query, 'limit');
    data.q = req.query['q'] ? (req.query['q'] as string) : undefined;

    const result: ResponseBody<PaginationResult<User>> = {
      status: 200,
      message: 'Users data successfully fetched',
      data: await getUsersLogic(data),
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

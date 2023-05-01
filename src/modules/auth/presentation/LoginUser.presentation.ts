import { User } from '../../../entity/User.entity';
import { ResponseBody } from '../../../framework/response.interface';
import { LoginInterface } from '../Auth.interface';
import { loginUserLogic } from '../logic/LoginUser.logic';
import { Request, Response } from 'express';

/**
 * Endpoint method untuk register
 */
export async function loginUser(req: Request, res: Response) {
  try {
    const data: LoginInterface = {
      email: req.body.email,
      password: req.body.password,
    };

    const user = await loginUserLogic(data);

    const result: ResponseBody<{ access_token: string; user: User }> = {
      status: 200,
      message: 'login sucessful',
      data: user,
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

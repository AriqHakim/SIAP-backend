import { Request, Response } from 'express';
import { LoginUserInterface } from '../Auth.interface';
import { loginUserLogic } from '../logic/LoginUser.logic';

/**
 * Endpoint method untuk register
 */
export async function loginUser(req: Request, res: Response) {
  try {
    const data: LoginUserInterface = {
      email: req.body.email,
      password: req.body.password,
    };

    const user = await loginUserLogic(data);

    const result = {
      status: 200,
      message: 'login sucessful',
      data: user,
    };
    res.send(result);
    return result;
  } catch (error) {
    const result = {
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

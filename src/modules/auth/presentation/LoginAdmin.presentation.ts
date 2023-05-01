import { Admin } from '../../../entity/Admin.entity';
import { ResponseBody } from '../../../framework/response.interface';
import { LoginInterface } from '../Auth.interface';
import { loginAdminLogic } from '../logic/LoginAdmin.logic';
import { Request, Response } from 'express';

/**
 * Endpoint method untuk register
 */
export async function loginAdmin(req: Request, res: Response) {
  try {
    const data: LoginInterface = {
      email: req.body.email,
      password: req.body.password,
    };

    const admin = await loginAdminLogic(data);

    const result: ResponseBody<{ access_token: string; admin: Admin }> = {
      status: 200,
      message: 'login sucessful',
      data: admin,
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

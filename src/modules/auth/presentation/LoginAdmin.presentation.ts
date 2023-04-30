import { Request, Response } from 'express';
import { LoginInterface } from '../Auth.interface';
import { loginAdminLogic } from '../logic/LoginAdmin.logic';

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

    const result = {
      status: 200,
      message: 'login sucessful',
      data: admin,
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

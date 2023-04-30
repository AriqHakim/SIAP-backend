import { Request, Response } from 'express';
import { RegisterInterface } from '../Auth.interface';
import { registerUser } from '../logic/register.logic';

/**
 * Endpoint method untuk register
 */
export async function register(req: Request, res: Response) {
  try {
    const data: RegisterInterface = {
      email: req.body.email,
      name: req.body.name,
      npm: req.body.npm,
      noTelp: req.body.noTelp,
      password: req.body.password,
      confirmPassword: req.body.confirmPassword,
      isAsisten: req.body.isAsisten,
    };

    await registerUser(data);

    const result = {
      status: 201,
      message: 'Register successful',
      data: {
        success: true,
      },
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

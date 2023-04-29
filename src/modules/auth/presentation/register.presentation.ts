import { NextFunction, Request, Response } from 'express';
import { RegisterInterface } from '../Auth.interface';
import { registerUser } from '../logic/register.logic';

/**
 * Endpoint method untuk register
 */
export async function register(
  req: Request,
  res: Response,
  next: NextFunction,
) {
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

    const result = {
      status: 201,
      message: 'Register successful',
      data: await registerUser(data),
    };

    res.send(result);
    return result;
  } catch (error) {
    next(error);
  }
}

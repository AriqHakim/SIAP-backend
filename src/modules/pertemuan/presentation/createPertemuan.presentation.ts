import { Request, Response } from 'express';
import { asistenChecker } from '../../../framework/AuthChecker';
import { ResponseBody } from '../../../framework/response.interface';
import { createPertemuanInterface } from '../pertemuan.interface';

export async function createPertemuan(req: Request, res: Response) {
  try {
    const data = new createPertemuanInterface();
    const auth = await asistenChecker(req.headers['authorization'] as string);

    data.asisten = auth.asisten;
    data.user = auth.user;

    const result: ResponseBody<{ success: boolean }> = {
      status: 201,
      message: 'kelas berhasil dibuat!',
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

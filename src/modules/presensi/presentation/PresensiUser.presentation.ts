import { Request, Response } from 'express';
import { PresensiUserInterface } from '../Presensi.interface';
import { ResponseBody } from '../../../framework/response.interface';
import { userChecker } from '../../../framework/AuthChecker';
import { presensiUserLogic } from '../logic/PresensiUser.logic';

export async function presensiUser(req: Request, res: Response) {
  try {
    const data = new PresensiUserInterface();
    const auth = await userChecker(req.headers['authorization'] as string);

    data.user = auth.user;
    data.pertemuanId = req.params.pertemuanId;
    data.kelasId = req.params.kelasId;
    data.file = req.file;

    const presensi = await presensiUserLogic(data);

    const result: ResponseBody<{ success: boolean }> = {
      status: 201,
      message: 'Presensi berhasil diisi',
      data: {
        success: presensi,
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

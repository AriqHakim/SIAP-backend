import { Request, Response } from 'express';
import { createPerizinanInterface } from '../Perizinan.interface';
import { userChecker } from '../../../framework/AuthChecker';
import { ResponseBody } from '../../../framework/response.interface';
import { createPerizinanLogic } from '../logic/CreatePerizinan.logic';
import { STATUS_KEHADIRAN } from '../../../entity/Presensi.entity';

export async function createPerizinan(req: Request, res: Response) {
  try {
    const data = new createPerizinanInterface();

    const auth = await userChecker(req.headers['authorization']);

    data.user = auth.user;
    data.kelasId = req.params.kelasId;
    data.pertemuanId = req.params.pertemuanId;
    data.file = req.file;

    await createPerizinanLogic(data);

    const result: ResponseBody<{ success: boolean }> = {
      status: 201,
      message: 'Perizinan berhasil dibuat',
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

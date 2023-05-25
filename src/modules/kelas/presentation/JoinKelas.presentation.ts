import { Request, Response } from 'express';
import { JoinKelasInterface } from '../Kelas.interface';
import { userChecker } from '../../../framework/AuthChecker';
import { ResponseBody } from '../../../framework/response.interface';
import { joinKelasLogic } from '../logic/JoinKelas.logic';

export async function joinKelas(req: Request, res: Response) {
  try {
    const data: JoinKelasInterface = new JoinKelasInterface();

    const auth = await userChecker(req.headers['authorization'] as string);

    data.user = auth.user;
    data.asisten = auth.asisten;
    data.kode = req.body.kode;

    const result: ResponseBody<{ success: boolean }> = {
      status: 200,
      message: 'Berhasil masuk kelas',
      data: {
        success: await joinKelasLogic(data),
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

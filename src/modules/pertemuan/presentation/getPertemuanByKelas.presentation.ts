import { Request, Response } from 'express';
import { getPertemuanByKelasInterface } from '../pertemuan.interface';
import { userChecker } from '../../../framework/AuthChecker';
import { ResponseBody } from '../../../framework/response.interface';
import { getPertemuanByKelasLogic } from '../logic/getPertemuanByKelas.logic';
import { Pertemuan } from '../../../entity/Pertemuan.entity';

export async function getPertemuanByKelas(req: Request, res: Response) {
  try {
    const data = new getPertemuanByKelasInterface();
    const auth = await userChecker(req.headers['authorization'] as string);

    data.asisten = auth.asisten;
    data.user = auth.user;
    data.kelasId = req.params.kelasId;

    const pertemuan = await getPertemuanByKelasLogic(data);

    const result: ResponseBody<Pertemuan[]> = {
      status: 200,
      message: 'data pertemuan berhasil diambil!',
      data: pertemuan,
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

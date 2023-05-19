import { Request, Response } from 'express';
import { ResponseBody } from '../../../framework/response.interface';
import { GetPresensiKelasInterface } from '../Presensi.interface';
import { userChecker } from '../../../framework/AuthChecker';
import { getPresensiKelasLogic } from '../logic/GetPresensiKelas.logic';
import { Presensi } from '../../../entity/Presensi.entity';

export async function getPresensiKelas(req: Request, res: Response) {
  try {
    const data = new GetPresensiKelasInterface();
    const auth = await userChecker(req.headers['authorization'] as string);

    data.user = auth.user;
    data.kelasId = req.params.kelasId;

    const presensi = await getPresensiKelasLogic(data);

    const result: ResponseBody<Presensi[]> = {
      status: 200,
      message: 'data berhasil diambil',
      data: presensi,
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

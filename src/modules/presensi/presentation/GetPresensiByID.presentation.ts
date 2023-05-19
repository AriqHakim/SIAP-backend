import { Request, Response } from 'express';
import { ResponseBody } from '../../../framework/response.interface';
import { PresensiByIdInterface } from '../Presensi.interface';
import { asistenChecker } from '../../../framework/AuthChecker';
import { getPresensiByIDLogic } from '../logic/GetPresensiByID.logic';
import { Presensi } from '../../../entity/Presensi.entity';

export async function getPresensiByID(req: Request, res: Response) {
  try {
    const data = new PresensiByIdInterface();
    const auth = await asistenChecker(req.headers['authorization'] as string);

    data.user = auth.user;
    data.asisten = auth.asisten;
    data.kelasId = req.params.kelasId;
    data.pertemuanId = req.params.pertemuanId;
    data.presensiId = req.params.presensiId;

    const presensi = await getPresensiByIDLogic(data);

    const result: ResponseBody<Presensi> = {
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

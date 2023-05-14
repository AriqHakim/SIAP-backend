import { Request, Response } from 'express';
import { Kelas } from '../../../entity/Kelas.entity';
import { ResponseBody } from '../../../framework/response.interface';
import { GetKelasByIDInterface } from '../Kelas.interface';
import { userChecker } from '../../../framework/AuthChecker';
import { getKelasByIDLogic } from '../logic/GetKelasByID.logic';

export async function getKelasByID(req: Request, res: Response) {
  try {
    const data = new GetKelasByIDInterface();
    const auth = await userChecker(req.headers['authorization'] as string);

    data.asisten = auth.asisten;
    data.user = auth.user;
    data.kelasId = req.params.kelasId;

    const kelas = await getKelasByIDLogic(data);

    const result: ResponseBody<{ kelas: Kelas; isAsisten: boolean }> = {
      status: 200,
      message: 'data kelas berhasil diambil!',
      data: kelas,
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

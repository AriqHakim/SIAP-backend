import { Request, Response } from 'express';
import { ResponseBody } from '../../../framework/response.interface';
import { userChecker } from '../../../framework/AuthChecker';
import { getBroadcastByKelasInterface } from '../Broadcast.interface';
import { getBroadcastByKelasLogic } from '../logic/getBroadcastByKelas.logic';
import { Broadcast } from '../../../entity/Broadcast.entity';

export async function getBroadcastByKelas(req: Request, res: Response) {
  try {
    const data = new getBroadcastByKelasInterface();
    const auth = await userChecker(req.headers['authorization'] as string);

    data.asisten = auth.asisten;
    data.user = auth.user;
    data.kelasId = req.params.kelasId;

    const broadcast = await getBroadcastByKelasLogic(data);

    const result: ResponseBody<Broadcast[]> = {
      status: 200,
      message: 'Data broadcast berhasil diambil',
      data: broadcast,
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

import { Request, Response } from 'express';
import { ResponseBody } from '../../../framework/response.interface';
import { deleteBroadcastByIDInterface } from '../Broadcast.interface';
import { asistenChecker } from '../../../framework/AuthChecker';
import { deleteBroadcastByIDLogic } from '../logic/deleteBroadcastByID.logic';

export async function deleteBroadcastByID(req: Request, res: Response) {
  try {
    const data = new deleteBroadcastByIDInterface();
    const auth = await asistenChecker(req.headers['authorization'] as string);

    data.asisten = auth.asisten;
    data.user = auth.user;
    data.kelasId = req.params.kelasId;
    data.broadcastId = req.params.broadcastId;

    const deleteResult = await deleteBroadcastByIDLogic(data);

    const result: ResponseBody<{ success: boolean }> = {
      status: 200,
      message: 'Data broadcast berhasil dihapus',
      data: {
        success: deleteResult,
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

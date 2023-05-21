import { Request, Response } from 'express';
import { deletePertemuanByIDInterface } from '../pertemuan.interface';
import { asistenChecker } from '../../../framework/AuthChecker';
import { ResponseBody } from '../../../framework/response.interface';
import { deletePertemuanByIDLogic } from '../logic/deletePertemuanByID.logict';

export async function deletePertemuanByID(req: Request, res: Response) {
  try {
    const data = new deletePertemuanByIDInterface();
    const auth = await asistenChecker(req.headers['authorization'] as string);

    data.asisten = auth.asisten;
    data.user = auth.user;
    data.kelasId = req.params.kelasId;
    data.pertemuanId = req.params.pertemuanId;

    const deleteResult = await deletePertemuanByIDLogic(data);

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

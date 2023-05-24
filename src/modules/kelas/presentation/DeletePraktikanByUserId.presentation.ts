import { Request, Response } from 'express';
import { DeletePraktikanByUserIDInterface } from '../Kelas.interface';
import { asistenChecker } from '../../../framework/AuthChecker';
import { ResponseBody } from '../../../framework/response.interface';
import { deletePraktikanByUserIDLogic } from '../logic/DeletePraktikanByUserId.logic';

export async function deletePraktikanByUserID(req: Request, res: Response) {
  try {
    const data = new DeletePraktikanByUserIDInterface();
    const auth = await asistenChecker(req.headers['authorization']);

    data.user = auth.user;
    data.asisten = auth.asisten;
    data.kelasId = req.params.kelasId;
    data.userId = req.params.userId;

    const deleted = await deletePraktikanByUserIDLogic(data);

    const result: ResponseBody<{ success: boolean }> = {
      status: 201,
      message: 'data berhasil dihapus',
      data: {
        success: deleted,
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

import { Request, Response } from 'express';
import { GetKelasByIDInterface } from '../Kelas.interface';
import { asistenChecker } from '../../../framework/AuthChecker';
import { ResponseBody } from '../../../framework/response.interface';
import { PaginationResult } from '../../../framework/pagination.interface';
import { UserKelas } from '../../../entity/UserKelas.entity';
import { getUserByKelasLogic } from '../logic/GetUserByKelasID.logic';

export async function getUserByKelas(req: Request, res: Response) {
  try {
    const data = new GetKelasByIDInterface();
    const auth = await asistenChecker(req.headers['authorization']);

    data.user = auth.user;
    data.asisten = auth.asisten;
    data.kelasId = req.params.kelasId;

    const userKelas = await getUserByKelasLogic(data);

    const result: ResponseBody<PaginationResult<UserKelas>> = {
      status: 200,
      message: 'data berhasil diambil',
      data: userKelas,
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

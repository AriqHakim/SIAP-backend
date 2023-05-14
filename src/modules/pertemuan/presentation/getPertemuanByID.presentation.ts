import { Request, Response } from 'express';
import { userChecker } from '../../../framework/AuthChecker';
import { getPertemuanByIDInterface } from '../pertemuan.interface';
import { ResponseBody } from '../../../framework/response.interface';
import { parseQueryToInt } from '../../../framework/utils';
import { getPertemuanByIDLogic } from '../logic/getPertemuanByID.logic';
import { PaginationResult } from '../../../framework/pagination.interface';
import { Pertemuan } from '../../../entity/Pertemuan.entity';
import { Presensi } from '../../../entity/Presensi.entity';

export async function getPertemuanByID(req: Request, res: Response) {
  try {
    const data = new getPertemuanByIDInterface();
    const auth = await userChecker(req.headers['authorization'] as string);

    data.asisten = auth.asisten;
    data.user = auth.user;
    data.kelasId = req.params.kelasId;
    data.id = req.params.id;
    data.offset = parseQueryToInt(req.query, 'offset');
    data.limit = parseQueryToInt(req.query, 'limit');

    const pertemuan = await getPertemuanByIDLogic(data);
    const result: ResponseBody<{
      data: Pertemuan;
      presensi: PaginationResult<Presensi>;
    }> = {
      status: 200,
      message: 'data pertemuan berhasil diambil',
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

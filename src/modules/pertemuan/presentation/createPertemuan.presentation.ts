import { Request, Response } from 'express';
import { asistenChecker } from '../../../framework/AuthChecker';
import { ResponseBody } from '../../../framework/response.interface';
import { createPertemuanInterface } from '../Pertemuan.interface';
import { dateConverter } from '../../../framework/utils';
import { createPertemuanLogic } from '../logic/createPertemuan.logic';
import { Pertemuan } from '../../../entity/Pertemuan.entity';

export async function createPertemuan(req: Request, res: Response) {
  try {
    const data = new createPertemuanInterface();
    const auth = await asistenChecker(req.headers['authorization'] as string);

    data.asisten = auth.asisten;
    data.user = auth.user;

    data.kelasId = req.params.kelasId;
    data.indexPertemuan = parseInt(req.body.indexPertemuan);
    data.judul = req.body.judul;
    data.startDate = dateConverter(req.body.startDate);

    const pertemuan = await createPertemuanLogic(data);

    const result: ResponseBody<Pertemuan> = {
      status: 201,
      message: 'kelas berhasil dibuat!',
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

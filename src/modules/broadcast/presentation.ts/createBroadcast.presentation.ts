import { Request, Response } from 'express';
import { createBroadcastInterface } from '../Broadcast.interface';
import { asistenChecker } from '../../../framework/AuthChecker';
import { ResponseBody } from '../../../framework/response.interface';
import { createBroadcastLogic } from '../logic/createBroadcast.logic';
import { dateConverter } from '../../../framework/utils';

export async function createBroadcast(req: Request, res: Response) {
  try {
    const data = new createBroadcastInterface();
    const auth = await asistenChecker(req.headers['authorization'] as string);

    data.asisten = auth.asisten;
    data.user = auth.user;
    data.judul = req.body.judul;
    data.deskripsi = req.body.deskripsi;
    data.kelasId = req.params.kelasId;
    data.date = dateConverter(req.body.date);
    data.attachments = req.body.attachments;

    const broadcast = await createBroadcastLogic(data);

    const result: ResponseBody<{ success: boolean }> = {
      status: 201,
      message: 'Pengumuman berhasil dibuat!',
      data: {
        success: broadcast,
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

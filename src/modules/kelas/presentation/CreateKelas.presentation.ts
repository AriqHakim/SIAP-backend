import { Request, Response } from 'express';
import { CreateKelasInterface } from '../Kelas.interface';
import { ResponseBody } from '../../../framework/response.interface';
import { asistenChecker } from '../../../framework/AuthChecker';
import { CreateKelasLogic } from '../logic/CreateKelas.logic';

export async function CreateKelas(req: Request, res: Response) {
  try {
    const data: CreateKelasInterface = new CreateKelasInterface();
    const auth = await asistenChecker(req.headers['authorization']);

    data.user = auth.user;
    data.asisten = auth.asisten;
    data.judul = req.body.judul;
    data.deskripsi = req.body.deskripsi;
    data.otherAsisten = req.body.otherAsisten;

    const insert = await CreateKelasLogic(data);

    const result: ResponseBody<{ success: boolean }> = {
      status: 201,
      message: 'Kelas berhasil dibuat',
      data: {
        success: insert,
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

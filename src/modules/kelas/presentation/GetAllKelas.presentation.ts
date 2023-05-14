import { Request, Response } from 'express';
import { GetAllKelasInterface } from '../Kelas.interface';
import { ResponseBody } from '../../../framework/response.interface';
import { GetAllKelasLogic } from '../logic/GetAllKelas.logic';
import { Kelas } from '../../../entity/Kelas.entity';
import { userChecker } from '../../../framework/AuthChecker';

export async function GetAllKelas(req: Request, res: Response) {
  try {
    const data: GetAllKelasInterface = new GetAllKelasInterface();

    const auth = await userChecker(req.headers['authorization'] as string);

    data.user = auth.user;
    data.asisten = auth.asisten;

    const result: ResponseBody<{ kelas: Kelas[]; owned: Kelas[] }> = {
      status: 200,
      message: 'Data Kelas berhasil diambil',
      data: {
        ...(await GetAllKelasLogic(data)),
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

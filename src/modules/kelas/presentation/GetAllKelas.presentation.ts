import { Request, Response } from 'express';
import { GetAllKelasInterface } from '../Kelas.interface';
import { jwt_config_user } from '../../../jwt.config';
import { UnauthorizedError } from '../../../framework/error.interface';
import { extractDataFromJWT } from '../../../framework/JWTExtractor';
import { User } from '../../../entity/User.entity';
import { AsistenPraktikum } from '../../../entity/AsistenPraktikum.entity';
import { ResponseBody } from '../../../framework/response.interface';
import { GetAllKelasLogic } from '../logic/GetAllKelas.logic';
import { Kelas } from '../../../entity/Kelas.entity';

export async function GetAllKelas(req: Request, res: Response) {
  try {
    const data: GetAllKelasInterface = new GetAllKelasInterface();

    if (!req.headers['authorization']) {
      throw new UnauthorizedError(`Your request is unauthorized`);
    }

    const auth = (await extractDataFromJWT(
      jwt_config_user,
      req.headers['authorization'],
    )) as { user: User; asisten: AsistenPraktikum };

    if (!auth.user) {
      throw new UnauthorizedError(`Your request is unauthorized`);
    }

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

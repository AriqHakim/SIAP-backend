import { Request, Response } from 'express';
import { GetAsistenInterface } from '../Asisten.interface';
import { asistenChecker } from '../../../framework/AuthChecker';
import { ResponseBody } from '../../../framework/response.interface';
import { parseQueryToInt } from '../../../framework/utils';
import { GetAsistenLogic } from '../logic/GetAsisten.logic';
import { PaginationResult } from '../../../framework/pagination.interface';
import { AsistenPraktikum } from '../../../entity/AsistenPraktikum.entity';

export async function GetAsisten(req: Request, res: Response) {
  try {
    const data: GetAsistenInterface = new GetAsistenInterface();

    const auth = await asistenChecker(req.headers['authorization'] as string);

    data.user = auth.user;
    data.asisten = auth.asisten;
    data.offset = parseQueryToInt(req.query, 'offset');
    data.limit = parseQueryToInt(req.query, 'limit');
    data.q = req.query['q'] ? (req.query['q'] as string) : undefined;

    const result: ResponseBody<PaginationResult<AsistenPraktikum>> = {
      status: 200,
      message: 'Asisten data successfully fetched',
      data: await GetAsistenLogic(data),
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

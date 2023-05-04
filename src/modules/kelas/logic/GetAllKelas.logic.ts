import { PaginationResult } from '../../../framework/pagination.interface';
import { Kelas } from '../../../entity/Kelas.entity';
import { GetAllKelasInterface } from '../Kelas.interface';

export async function GetAllKelasLogic(data: GetAllKelasInterface) {
  const kelas: PaginationResult<Kelas> = null;
  const owned: PaginationResult<Kelas> = data.asisten ? null : null;
  return {
    kelas,
    owned,
  };
}

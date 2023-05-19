import express from 'express';
import { upload } from '../../framework/MulterToFirebase';
import { presensiUser } from './presentation/PresensiUser.presentation';
import { getPresensiKelas } from './presentation/GetPresensiKelas.presentation';
import { getPresensiByID } from './presentation/GetPresensiByID.presentation';

const router = express.Router();

router.post(
  '/kelas/:kelasId/pertemuan/:pertemuanId/presensi/',
  upload.single('image'),
  presensiUser,
);
router.get('/kelas/:kelasId/presensi/all', getPresensiKelas);
router.get(
  '/kelas/:kelasId/pertemuan/:pertemuamId/presensi/:presensiId',
  getPresensiByID,
);

export default router;

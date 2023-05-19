import express from 'express';
import { upload } from '../../framework/MulterToFirebase';
import { presensiUser } from './presentation/PresensiUser.presentation';
import { getPresensiKelas } from './presentation/GetPresensiKelas.presentation';

const router = express.Router();

router.post(
  '/kelas/:kelasId/pertemuan/:pertemuanId/presensi/',
  upload.single('image'),
  presensiUser,
);
router.get('/kelas/:kelasId/presensi/all', getPresensiKelas);

export default router;

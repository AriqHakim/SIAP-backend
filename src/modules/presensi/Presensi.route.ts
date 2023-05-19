import express from 'express';
import { upload } from '../../framework/MulterToFirebase';
import { presensiUser } from './presentation/PresensiUser.presentation';

const router = express.Router();

router.post(
  '/kelas/:kelasId/pertemuan/:pertemuanId/presensi/',
  upload.single('image'),
  presensiUser,
);

export default router;

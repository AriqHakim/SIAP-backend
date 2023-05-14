import express from 'express';
import { upload } from '../../framework/MulterToFirebase';
import { createPerizinan } from './presentation/CreatePerizinan.presentation';

const router = express.Router();

router.post(
  '/kelas/:kelasId/pertemuan/:pertemuanId/perizinan',
  upload.single('image'),
  createPerizinan,
);

export default router;

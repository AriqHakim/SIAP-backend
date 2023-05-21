import express from 'express';
import { createPertemuan } from './presentation/createPertemuan.presentation';
import { getPertemuanByID } from './presentation/getPertemuanByID.presentation';
import { getPertemuanByKelas } from './presentation/getPertemuanByKelas.presentation';
import { deletePertemuanByID } from './presentation/deletePertemuanByID.presentation';

const router = express.Router();

router.post('/kelas/:kelasId/pertemuan', createPertemuan);
router.get('/kelas/:kelasId/pertemuan/:id', getPertemuanByID);
router.get('/kelas/:kelasId/pertemuan', getPertemuanByKelas);
router.delete(
  '/kelas/:kelasId/pertemuan/:pertemuanId/delete',
  deletePertemuanByID,
);

export default router;

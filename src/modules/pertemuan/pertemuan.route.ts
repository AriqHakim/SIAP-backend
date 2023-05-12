import express from 'express';
import { createPertemuan } from './presentation/createPertemuan.presentation';
import { getPertemuanByID } from './presentation/getPertemuanByID.presentation';

const router = express.Router();

router.post('/kelas/:kelasId/pertemuan', createPertemuan);
router.get('/kelas/:kelasId/pertemuan/:id', getPertemuanByID);

export default router;

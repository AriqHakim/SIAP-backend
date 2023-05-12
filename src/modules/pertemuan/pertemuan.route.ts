import express from 'express';
import { createPertemuan } from './presentation/createPertemuan.presentation';

const router = express.Router();

router.post('/kelas/:kelasId/pertemuan', createPertemuan);

export default router;

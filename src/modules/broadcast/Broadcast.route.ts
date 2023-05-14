import express from 'express';
import { createBroadcast } from './presentation.ts/createBroadcast.presentation';
import { getBroadcastByKelas } from './presentation.ts/getBroadcastByKelas.presentation';

const router = express.Router();

router.post('/kelas/:kelasId/broadcast', createBroadcast);
router.get('/kelas/:kelasId/broadcast', getBroadcastByKelas);

export default router;

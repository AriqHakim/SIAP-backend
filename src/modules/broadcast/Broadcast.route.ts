import express from 'express';
import { createBroadcast } from './presentation/createBroadcast.presentation';
import { getBroadcastByKelas } from './presentation/getBroadcastByKelas.presentation';
import { deleteBroadcastByID } from './presentation/deleteBroadcastByID.presentation';

const router = express.Router();

router.post('/kelas/:kelasId/broadcast', createBroadcast);
router.get('/kelas/:kelasId/broadcast', getBroadcastByKelas);
router.delete(
  '/kelas/:kelasId/broadcast/:broadcastId/delete',
  deleteBroadcastByID,
);

export default router;

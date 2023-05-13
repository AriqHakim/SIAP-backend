import express from 'express';
import { createBroadcast } from './presentation.ts/createBroadcast.presentation';

const router = express.Router();

router.post('/kelas/:kelasId/broadcast', createBroadcast);

export default router;

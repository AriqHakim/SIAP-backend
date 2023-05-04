import express from 'express';
import { GetAllKelas } from './presentation/GetAllKelas.presentation';

const router = express.Router();

router.get('/', GetAllKelas);

export default router;

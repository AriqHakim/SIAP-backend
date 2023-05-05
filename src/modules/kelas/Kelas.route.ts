import express from 'express';
import { GetAllKelas } from './presentation/GetAllKelas.presentation';
import { CreateKelas } from './presentation/CreateKelas.presentation';

const router = express.Router();

router.get('/', GetAllKelas);
router.post('/', CreateKelas);

export default router;

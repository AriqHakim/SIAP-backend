import express from 'express';
import { GetAllKelas } from './presentation/GetAllKelas.presentation';
import { CreateKelas } from './presentation/CreateKelas.presentation';
import { joinKelas } from './presentation/JoinKelas.presentation';

const router = express.Router();

router.get('/', GetAllKelas);
router.post('/', CreateKelas);
router.post('/join', joinKelas);

export default router;

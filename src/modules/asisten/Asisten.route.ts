import express from 'express';
import { GetAsisten } from './presentation/GetAsisten.presentation';

const router = express.Router();

router.get('/', GetAsisten);

export default router;

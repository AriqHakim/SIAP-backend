import express from 'express';
import { register } from './presentation/register.presentation';

const router = express.Router();

router.post('/register', register);

export default router;

import express from 'express';
import { register } from './presentation/register.presentation';
import { loginUser } from './presentation/LoginUser.presentation';

const router = express.Router();

router.post('/register', register);
router.post('/login', loginUser);

export default router;

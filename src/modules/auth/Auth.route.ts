import express from 'express';
import { register } from './presentation/register.presentation';
import { loginUser } from './presentation/LoginUser.presentation';
import { loginAdmin } from './presentation/LoginAdmin.presentation';

const router = express.Router();

router.post('/register', register);
router.post('/login', loginUser);
router.post('/admin/login', loginAdmin);

export default router;

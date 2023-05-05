import express from 'express';
import { getUserByID } from './presentation/GetUserByID.presentation';

const router = express.Router();

router.get('/:id', getUserByID);

export default router;

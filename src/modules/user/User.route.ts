import express from 'express';
import { getUserByID } from './presentation/GetUserByID.presentation';
import { getUsers } from './presentation/GetUsers.presentation';

const router = express.Router();

router.get('/:id', getUserByID);
router.get('/', getUsers);

export default router;

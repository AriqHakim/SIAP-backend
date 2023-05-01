import express from 'express';
import { getAllApproval } from './presentation/GetAllApproval.presentation';

const router = express.Router();

//endpoint
router.get('/approvals', getAllApproval);

export default router;

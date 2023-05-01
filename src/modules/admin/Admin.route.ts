import express from 'express';
import { getAllApproval } from './presentation/GetAllApproval.presentation';
import { acceptApproval } from './presentation/AcceptApproval.presentation';

const router = express.Router();

//endpoint
router.get('/approvals', getAllApproval);
router.put('/approval/:id/accept', acceptApproval);

export default router;

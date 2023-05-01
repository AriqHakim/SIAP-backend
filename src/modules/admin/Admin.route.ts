import express from 'express';
import { getAllApproval } from './presentation/GetAllApproval.presentation';
import { acceptApproval } from './presentation/AcceptApproval.presentation';
import { rejectApproval } from './presentation/RejectApproval.presentation';

const router = express.Router();

//endpoint
router.get('/approvals', getAllApproval);
router.put('/approval/:id/accept', acceptApproval);
router.put('/approval/:id/reject', rejectApproval);

export default router;
